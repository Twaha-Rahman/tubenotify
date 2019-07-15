interface IObjToWrite {
  channelTag: string;
  data: any;
}

async function writeToDB(refToDB: any, objToWrite: IObjToWrite) {
  const reference = await refToDB;
  const transaction = reference.transaction(`Query`, `readwrite`);
  const objectStore: any = transaction.store;
  objectStore.add(objToWrite);
  const status = await transaction.done;
  return status;

  refToDB
    .then((ref: any) => {
      const tx = ref.transaction(`Query`, `readwrite`);
      const store: any = tx.store;
      store.add(objToWrite);
      return tx.done;
    })

    .then(() => {
      console.log(`Successfully added data!`);
    })
    .catch(() => {
      console.log(`Sorry! An error occured!`);
    });
}

export default writeToDB;
/*
.then((ref: any) => {
    const tx = ref.transaction(`Query`, `readwrite`);
    const store: any = tx.store;
    const data = store.getKey(2);
    return data;
})
*/
/*
    dbRef
    .then(ref => {
        const tx = ref.transaction(`Query`, `readwrite`);
        const store: any = tx.store;
        const data = store.get(1);
        return data;
    })
    */
/*
dbRef
.then(ref => {
    const tx = ref.transaction(`Query`, `readwrite`);
    const store: any = tx.store;
    store.add({
    channelTag: `fsdfsf`,
    asas: 653464363456
    });
    return tx.done;
})
*/
