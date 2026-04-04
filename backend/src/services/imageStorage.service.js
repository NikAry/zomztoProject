const getImageKit = async () => {
  const { default: ImageKit } = await import('@imagekit/nodejs');
  return new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  });
};

const foodVideoUpload = async (file, fileName) => {
  const client = await getImageKit();
  const response = await client.files.upload({
    file: file,
    fileName: fileName,
  });
  return response;
};

module.exports = { foodVideoUpload }; // ✅ now require() works