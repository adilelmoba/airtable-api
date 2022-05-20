const id_user = 58;

// GET DATA FROM Airtable..
fetch(`https://api.airtable.com/v0/appE4myFZ0tLKOB4A/Table%201`, {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer key0pl5t9UZ83pi8j`,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Something went wrong");
    }
  })
  .then((records) => {
    // MANIPULATE THE DOM… 🤹
    const tbody = document.querySelector("tbody");
    let row = "";
    let uuiduser_api;
    let avatar;
    for (let record of records.records) {
      uuiduser_api = record.fields.uuiduser;
    
      // TO GET THE USER DATA, FROM Vainkeurz API…
      fetch(`https://vainkeurz.com/wp-json/vkrz/v1/getuserinfo/${uuiduser_api}`, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Something went wrong");
          }
        })
        .then((rawResponse) => {
          console.log(rawResponse.avatar);

          avatar = rawResponse.avatar;

          row += `
            <tr id="${record.id}" class="data-row">
              <th scope="row">
                <span class="avatar" style="background-image: url('${avatar}');"></span>
              </th>
              <th scope="row" contenteditable="true" id="id_user" >${record.fields.id_user}</th>
              <td contenteditable="true" id="uuiduser" >${record.fields.uuiduser}</td>
              <td contenteditable="true" id="related_id" >${record.fields.related_id}</td>
              <td contenteditable="true" id="relation_uuid" >${record.fields.relation_uuid}</td>
              <td contenteditable="true" id="notif_text" >${record.fields.notif_text}</td>
              <td contenteditable="true" id="liens_vers" >${record.fields.liens_vers}</td>
              <td contenteditable="true" id="statut">
                <input type="radio" name="statut-${record.id}" value="Nouveau" ${record.fields.statut == 'nouveau' ? 'checked' : ''}> Nouveau <br>
                <input type="radio" name="statut-${record.id}" value="Vu" ${record.fields.statut == 'vu' ? 'checked' : ''}> Vu
              </td>
    
              <td>
                <a 
                  class="btn btn-dark mr-50" 
                  href="#" 
                  id="updateBtn" 
                  role="button"
    
                  data-id="${record.id}"
                >
                Update</a>
                
                <a class="btn btn-danger" href="#" id="deleteBtn" data-id="${record.id}" role="button">Delete</a>
              </td>
            </tr>
          `;

          tbody.innerHTML = row;
        })
        .catch((error) => {
          customToast.error("Something went wrong.");
          console.log("Error", error);
        });
    }

    // UPDATE
    $(document).on("click", "#updateBtn", {}, function (e) {
      var updateBtn = $(this);

      var id = updateBtn.data("id");

      var container = $(`#${id}`);

      var id_user = Number(container.find('#id_user').html());
      var uuiduser = container.find('#uuiduser').html();
      var related_id = Number(container.find('#related_id').html());
      var relation_uuid = container.find('#relation_uuid').html();
      var notif_text = container.find('#notif_text').html();
      var liens_vers = container.find('#liens_vers').html();
      var statut = container.find('#statut input:checked').val().toLowerCase();

      let response = fetch(
        "https://api.airtable.com/v0/appE4myFZ0tLKOB4A/Table%201",
        {
        method: "PATCH",
        body: JSON.stringify({
          records: [
            {
              id: id,
              fields: {
                id_user: id_user,
                uuiduser: uuiduser,
                related_id: related_id,
                relation_uuid: relation_uuid,
                notif_text: notif_text,
                liens_vers: liens_vers,
                statut: statut,
              },
            },
          ],
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer key0pl5t9UZ83pi8j`,
        },
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((rawResponse) => {
        console.log(rawResponse);

        location.reload();
      })
      .catch((error) => {
        customToast.error("Something went wrong.");
        console.log("Error", error);
      });
    });

    // DELETE
    $(document).on("click", "#deleteBtn", {}, function (e) {
      var deleteBtn = $(this);
      var id = deleteBtn.data("id");

      $.ajax({
        url: `https://api.airtable.com/v0/appE4myFZ0tLKOB4A/Table%201/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer key0pl5t9UZ83pi8j`,
        },
      })
        .done(function (response) {
          console.log(response);

          // location.reload();
        })
        .always(function () {
          ajaxRunning = false;
        });
    });
  })
  .catch((error) => {
    customToast.error("Something went wrong.");
    console.log("Error", error);
  });
