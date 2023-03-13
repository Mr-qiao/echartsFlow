import JSEncrypt from 'jsencrypt';

const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDN+X20GkPAH6GasffiqLSzWwgNKKFERBz3fqrJ76C+NyBnS9+fgUxxcB72AYRS+nki12zbgWmLxiy/Mm5HVwlYF4ko/8NQvr7mW3KeSVfX9MPsiu/qCBUFrkOwsR1wNii2uhulPT6oboJvf9tc6yXc8xQw31JVwgKOwodzf4wduQIDAQAB';
// const publicKey = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAO36j6jkBJ8+FkQ4rdsbpDp6LUvzxkoBz8uQsmO1QSoPVBvxM5MiJGYi4qq0/AUxdufqM4QVZK26mDP7jdcDq+UCAwEAAQ==`
let encrypt = new JSEncrypt();
encrypt.setPublicKey(publicKey);

function encode(val: any) {
  return encrypt.encrypt(val);
}

export default encode;
