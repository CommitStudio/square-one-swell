###### DEPLOYMENT BUTTONS
| vercel | azure |
|---|---|
| [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCommitStudio%2Fsquare-one-swell&env=NEXT_PUBLIC_BASE_URL,SWELL_STORE_ID,SWELL_SECRET_KEY,SWELL_PUBLIC_KEY,NEXT_PUBLIC_GTM_ID) | [![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-quickstart-templates%2Fmaster%2Fquickstarts%2Fmicrosoft.storage%2Fstorage-account-create%2Fazuredeploy.json) |

## Introduction to Square One

Square One is an e-commerce platform powered by Swell, designed to provide businesses with a flexible solution for selling products online. You can easily design and brand your online store, process payments, and manage shipping to create a successful e-commerce business.

## Overview

1. Features
2. Main Technologies
3. Before starting development
4. Running Square One
5. License

## 1. Features

- E-commerce theme optimized for a Swell store
- Home page
  - Navbar
  - Hero gallery linked with categories
  - Category slider
  - Featured products
  - Promo section
  - CTA to subscribe (needs to be connected with client e-mail marketing automation platform)
  - Product Listing with filter, search bar, sort by, and pagination
- Product listing with filter, search bar, sort by, and pagination
- Product detail and related products
- Cart and payment method (powered by Swell)
- User area
  - Create an account, login, reset the password
  - Edit profile, manage your address and payment methods
  - List orders, orders details
- About us, FAQ, Contact, Blog

## 2. Main Technologies

- Typescript
- Next.js v13.4.3 (using App Router) and React.js v18.2.0
- Tailwind CSS

## 3. Before starting development

To use Square One, you need to have a Swell account with a respective store. Visit the [Swell official website](https://www.swell.is/) for more information.

## 4. Running Square One (local)

To run the store locally:

1. Clone the repository.
2. Install all the necessary modules and packages by typing `npm install` in the command line.
3. To connect your store to the Square One project:
   3.1. Go to the Developer's dropdown menu in the API keys section, and grab your store ID, secret key, and public key.
   3.2. Create your `.env` file, copying the `.env.example`, and set the relevant keys.
   - In case needed, a variable is available for a Google GTAG.
4. Run the store by typing `npm run dev`.

## 5. License

MIT License
Copyright (c) 2023 Commit Studio
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

#### Contact

Thanks for working with us; any issues please contact us at [hello@commit.studio](mailto:hello@commit.studio)

Copyright (c) 2023 Commit Studio. All Rights Reserved.
