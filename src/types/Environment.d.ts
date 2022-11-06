declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SWELL_STORE_ID?: string;
      SWELL_SECRET_KEY?: string;
      SWELL_PUBLIC_KEY?: string;
      PUBLIC_STORE_URL: string;
      PUBLIC_SWELL_STORE_ID?: string;
      PUBLIC_SWELL_PUBLIC_KEY?: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
