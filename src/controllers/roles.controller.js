
export const getRoles = async(req, res) => {
  try {
    res.send('getting projects...');
  } catch (error) {
    console.log(`An error has ocurred: ${error}`);
  }
}