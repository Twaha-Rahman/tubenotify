async function dbReader(refToDB: any, objectStore: any) {
  try {
    const db = await refToDB;
    const tx = db.transaction(objectStore, 'readwrite');
    const data = await tx.objectStore(objectStore).getAll();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
  return null;
}

export default dbReader;
