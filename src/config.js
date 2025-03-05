const mode = import.meta.env.MODE;

const config = mode === "development" ? {
  SKIP_ONBOARDING: import.meta.env.VITE_SKIP_ONBOARDING === "true",
  TOKEN: import.meta.env.VITE_SKYPORTAL_TOKEN,
  INSTANCE_URL: import.meta.env.VITE_SKYPORTAL_INSTANCE_URL,
  INSTANCE_NAME: import.meta.env.VITE_SKYPORTAL_INSTANCE_NAME,
  CLEAR_AUTH: import.meta.env.VITE_CLEAR_AUTH === "true",
  SCANNING_START_DATE: import.meta.env.VITE_SCANNING_START_DATE,
} : {};

export default config;
