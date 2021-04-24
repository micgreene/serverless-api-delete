'use strict';

const peopleModel = require('./schema.js');

exports.handler = async (event) => {
  try {    
    //get id number from request parameters
    const id = event.queryStringParameters && event.queryStringParameters.id;    

    const list = await peopleModel.query('id').eq(id).exec();
    let deletedRecord = list[0];

    //updats record in database
    await peopleModel.delete(id);

    //return proper status code and copy of updated record
    return {
      statuscode: 204,
      body: JSON.stringify(deletedRecord)
    }

  } catch (e) {
    return {
      statuscode: 500,
      body: e.message
    }
  }
};
