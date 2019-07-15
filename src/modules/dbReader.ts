function dbReader(refToDB: any) {
  refToDB
    .then((ref: any) => {
      const tx = ref.transaction(`Query`, `readwrite`);
      const store: any = tx.store;
      const data = store.getAll();
      return data;
    })

    .then((data: any) => {
      console.log(`Success!`);
      console.log(data);
    })
    .catch(() => {
      console.log(`Sorry! An error occured!`);
    });
}

export default dbReader;
