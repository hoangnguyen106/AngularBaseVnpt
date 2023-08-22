export const REGEXP_NAME = new RegExp(/^[^~@#$%^*=+|}{[\];'",><?`]*$/);

export const REGEXP_EMAIL = new RegExp(
  /[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/
);

export const REGEXP_PASSWORD = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[{}`~!@#$%^&()_+='[\]:;.,?\-/\\])[A-Za-z\d{}`~!@#$%^&()_+='[\]:;.,?\-/\\]{8,256}$/
);
