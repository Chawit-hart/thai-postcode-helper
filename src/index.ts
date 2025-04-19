import rawData from '../data/data.json'
import { normalize } from './utils'
import Fuse from 'fuse.js'

interface AddressEntry {
  province_th: string
  province_en: string
  district_th: string
  district_en: string
  subdistrict_th: string
  subdistrict_en: string
  zipcode: string
}

const data = rawData as AddressEntry[]

export function findPostcode(province: string, district: string, subdistrict: string, lang: 'th' | 'en' = 'th') {
  return data
    .filter(entry =>
      normalize(entry[`province_${lang}`]) === normalize(province) &&
      normalize(entry[`district_${lang}`]) === normalize(district) &&
      normalize(entry[`subdistrict_${lang}`]) === normalize(subdistrict)
    )
    .map(entry => entry.zipcode)
}

export function findByPostcode(zipcode: string, lang: 'th' | 'en' = 'th') {
  return data
    .filter(entry => entry.zipcode === zipcode)
    .map(entry => ({
      province: entry[`province_${lang}`],
      district: entry[`district_${lang}`],
      subdistrict: entry[`subdistrict_${lang}`],
      zipcode: entry.zipcode,
    }))
}

export function suggestSubdistricts(province?: string, district?: string, lang: 'th' | 'en' = 'th'): string[] {
  return Array.from(new Set(
    data
      .filter(entry => {
        if (province && normalize(entry[`province_${lang}`]) !== normalize(province)) return false
        if (district && normalize(entry[`district_${lang}`]) !== normalize(district)) return false
        return true
      })
      .map(entry => entry[`subdistrict_${lang}`])
  ))
}

export function suggestSubdistrictsFuzzy(keyword: string, lang: 'th' | 'en' = 'th', limit = 10): string[] {
  const entries = Array.from(new Set(data.map(entry => entry[`subdistrict_${lang}`])))
  const fuse = new Fuse(entries, {
    threshold: 0.4,
  })
  return fuse.search(keyword).slice(0, limit).map(r => r.item)
}

export function findPostcodeFuzzy(
  provinceInput: string,
  districtInput: string,
  subdistrictInput: string,
  lang: 'th' | 'en' = 'th'
): string[] {
  const provKey = `province_${lang}` as keyof AddressEntry
  const distKey = `district_${lang}` as keyof AddressEntry
  const subdistKey = `subdistrict_${lang}` as keyof AddressEntry

  const provinceFuse = new Fuse(data, {
    keys: [provKey],
    threshold: 0.4
  })

  const matchedProvince = provinceFuse.search(provinceInput)[0]?.item
  if (!matchedProvince) return []

  const filteredByProvince = data.filter(
    d => d[provKey] === matchedProvince[provKey]
  )

  const districtFuse = new Fuse(filteredByProvince, {
    keys: [distKey],
    threshold: 0.4
  })

  const matchedDistrict = districtFuse.search(districtInput)[0]?.item
  if (!matchedDistrict) return []

  const filteredByDistrict = filteredByProvince.filter(
    d => d[distKey] === matchedDistrict[distKey]
  )

  const subdistrictFuse = new Fuse(filteredByDistrict, {
    keys: [subdistKey],
    threshold: 0.4
  })

  const matchedSubdistrict = subdistrictFuse.search(subdistrictInput)[0]?.item
  if (!matchedSubdistrict) return []

  return [matchedSubdistrict.zipcode]
}