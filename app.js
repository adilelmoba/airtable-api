var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "key0pl5t9UZ83pi8j",
});
var base = Airtable.base("appE4myFZ0tLKOB4A");
const table = base("Table 1");

const getRecords = async () => {
  // SELECT THE WHOLE DATA..
  // const records = await table.select().firstPage();

  // SELECT ONLY FIELD (statut)
  const records = table
    .select({
      view: "Grid view",
    })
    .firstPage(function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log("Retrieved", record.get("statut"));
      });
    });
  console.log(records);
};
// getRecords();

const getRecordsForASpecificVainkeur = async (id_user, statut) => {
  const records = table
    .select({
      view: "Grid view",
    })
    .firstPage(function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        if(record.get('id_user') === id_user && record.get('statut') == statut) {
          console.log(record);
        }
      });
    });
  console.log(records);
};
// getRecordsForASpecificVainkeur(7, 'vu');

const getRecordById = async (id) => {
  const record = table.find(id, function (err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Retrieved", record.id);
  });
  console.log(record);
};
// getRecordById('recvpCg7lt6xaY73N');

const createRecord = async () => {
  table.create(
    [
      {
        fields: {
          id_user: 1,
          uuiduser: "1dad0000f4581c",
          related_id: 100,
          relation_uuid: "029fbsdsde531",
          notif_text: "Adil vous guette !",
          liens_vers: "http://localhost:8888/vkrz/v/Adil",
          statut: "nouveau",
        },
      }
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    }
  );
};
// createRecord();

const updateRecord = async (id) => {
  table.update(
    [
      {
        id: id,
        fields: {
          id_user: 07,
          uuiduser: "1dad0000f4581c",
          related_id: 100,
          relation_uuid: "029fbsdsde531",
          notif_text: "Adilovic vous guette !",
          liens_vers: "http://localhost:8888/vkrz/v/Adil",
          statut: "nouveau",
        },
      }
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    }
  );
};
// updateRecord('rectVUqALYhkWdUR5');

const deleteRecord = async (id) => {
  table.destroy(
    [
      id
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    }
  );
};
// deleteRecord('rec690pqj88YV3TXF');
