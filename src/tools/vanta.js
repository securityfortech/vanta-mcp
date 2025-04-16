import vanta from '@api/vanta';

export const listDocuments = async (access_token, pageSize) => {
  try {
    vanta.auth(access_token);
    const { data } = await vanta.listDocuments({ pageSize });
    return JSON.stringify(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const listControls = async (access_token, pageSize) => {
  try {
    vanta.auth(access_token);
    const { data } = await vanta.listControls({ pageSize });
    return JSON.stringify(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};