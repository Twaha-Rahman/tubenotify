async function dbReader(refToDB: any, objectStore: any, id?: number) {
  try {
    const db = await refToDB;
    const tx = db.transaction(objectStore, 'readwrite');

    let data;

    //tslint:disable

    if (id) {
      data = await tx.objectStore(objectStore).get(id);
    } else {
      data = await tx.objectStore(objectStore).getAll();
    }

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
  return null;
}

export default dbReader;
