# thai-postcode-helper

[![npm version](https://img.shields.io/npm/v/thai-postcode-helper)](https://www.npmjs.com/package/thai-postcode-helper)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/Chawit-hart/thai-postcode-helper/ci.yml?label=build)](https://github.com/Chawit-hart/thai-postcode-helper/actions)

A Thai address postcode resolver with fuzzy search and bilingual (Thai/English) support.

> Easily map provinces, districts, subdistricts to zipcodes in Thailand — with typo-tolerant search.

---


## Table of Contents

- [thai-postcode-helper](#thai-postcode-helper)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [API Reference](#api-reference)
  - [Data Format](#data-format)
  - [License](#license)

---

## Installation

```bash
npm install thai-postcode-helper
```

## Usage

```js
import {
  findPostcode,
  findPostcodeFuzzy,
  findByPostcode,
  suggestSubdistricts,
  suggestSubdistrictsFuzzy
} from 'thai-postcode-helper'

// Basic lookup
findPostcode('ชุมพร', 'เมืองชุมพร', 'ท่าตะเภา') // ['86000']
findPostcode('Chumphon', 'Mueang Chumphon', 'Thataphao', 'en') // ['86000']

// Reverse lookup
findByPostcode('86000') // [{ province, district, subdistrict, zipcode }]

// Suggestions
suggestSubdistricts('ชุมพร', 'เมืองชุมพร') // ['ท่าตะเภา', ...]

// Fuzzy search (tolerates typos)
findPostcodeFuzzy('Chumpon', 'Muang Choomphon', 'Tha Tapao', 'en') // ['86000']
suggestSubdistrictsFuzzy('Thataphaw', 'en') // ['Tha Taphao']
```

## Features
 - Full Thai address mapping: province → district → subdistrict → zipcode
 - Supports both Thai and English
 - Fuzzy search (powered by Fuse.js)
 - Typo-tolerant and normalized matching
 - Data included in package (data/data.json)

## API Reference

`findPostcode(province, district, subdistrict, lang?)` <br>
Return: `string[]`

`findPostcodeFuzzy(province, district, subdistrict, lang?)` <br>
Return: `string[]` (with typo tolerance)

`findByPostcode(zipcode, lang?)` <br>
Return: `{ province, district, subdistrict, zipcode }[]` 

`suggestSubdistricts(province?, district?, lang?)` <br>
Return: `string[]`

`suggestSubdistrictsFuzzy(input, lang?, limit?)` <br>
Return: `string[]`

## Data Format
The package includes a flat JSON dataset:
```json
{
  "province_th": "ชุมพร",
  "province_en": "Chumphon",
  "district_th": "เมืองชุมพร",
  "district_en": "Mueang Chumphon",
  "subdistrict_th": "ท่าตะเภา",
  "subdistrict_en": "Thataphao",
  "zipcode": "86000"
}
```
## License
MIT © 2025 Chawit Tanachochaow