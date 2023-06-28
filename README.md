## Introduction to Square One

Square One is an e-commerce storefront powered by Swell, designed to provide businesses with a flexible solution for selling products online. You can easily design and brand your online store, process payments, and manage shipping to create a successful e-commerce business.

## Overview

1. Features
2. Main Technologies
3. Before starting development
4. Running Square One
5. Deployment
6. License

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

## 5. Deployment

|                                                                                                                        Platform                                                                                                                         | Specification                                                                                                                                                                     |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCommitStudio%2Fsquare-one-swell&env=NEXT_PUBLIC_BASE_URL,SWELL_STORE_ID,SWELL_SECRET_KEY,SWELL_PUBLIC_KEY,NEXT_PUBLIC_GTM_ID) | For deployment in Vercel, click the button and set the environment variables                                                                                                      |
|                                         [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/CommitStudio/square-one-swell)                                         | For deployment in Netlify, click the button and after finished the process, set your environment variables under `Site settings/ Environment variables ` as per .env.example file |

## 6. License

The Extended General Public License (GPL) is a free, copyleft license for software and other kinds of works, which extends the terms of the original GPL version 3.0 to encompass certain explicit permissions and restrictions pertaining to the utilization of themes.

### Preamble

The Extended GPL3 license preserves the core principles of the GPL3 license such as the freedom to run the program, to study and change it, and to redistribute copies with or without changes. This specific version, however, modifies the redistribution principle to align with certain provisions listed below, especially focusing on theme utilization.

### Terms and Conditions

#### 0. Definitions

- "This License" refers to the Extended General Public License.
- "The Program" refers to any copyrightable work licensed under this License. Each license is addressed as "you". "Licensees" and "recipients" may be individuals or organizations.
- A "theme" in this context refers to a predefined set of aesthetics and design elements that can be applied to an end product.

#### 1. Permissions

Under this License, you are permitted to:

1. Use the theme to create unlimited end products.
2. Modify the theme to create your own version of the store. Those store themes are subject to this License.
3. Use the theme to create unlimited end products for unlimited clients.
4. Use the theme to create end products where the end product is sold to end users.
5. Use the theme to create end products that are open source and freely available to end users.

#### 2. Restrictions

Under this License, you are not permitted to:

1. Use the theme to create end products that are designed to allow an end user to build their own end products using the theme or derivatives of the theme.
2. Re-distribute the theme or derivatives of the theme separately from an end product, neither in code or as design assets.

### NO WARRANTY

BECAUSE THE PROGRAM IS LICENSED FREE OF CHARGE, THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

## End of Terms and Conditions

---

#### Contact

Thanks for working with us; any issues please contact us at [hello@commit.studio](mailto:hello@commit.studio)

Copyright (c) 2023 Commit Studio. All Rights Reserved.
