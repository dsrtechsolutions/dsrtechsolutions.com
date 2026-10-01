// Labels for each website form, used by the admin panel.
// Keep the keys in sync with FORMS in server/forms.js.
export const FORM_TYPES = {
  contact: { label: 'Contact Form' },
};

export const formLabel = (type) => FORM_TYPES[type]?.label || type;
