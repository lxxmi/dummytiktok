const {createClient} = require("@astrajs/collections");
const collection = "testCol";

exports.handler = async function(event, context, callback) {
    const astraClient = await createClient({
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        username: process.env.ASTRA_DB_USERNAME,
        password: process.env.ASTRA_DB_PASSWORD,
    });    

    const posts = astraClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection(collection);
    const body = JSON.parse(event.body)
    console.log("---------\nid", body.userId)
    console.log("---------\ndata", body.data)

    try {
        let res = await posts.update(body.userId, body.data)
        console.log(res)
      return{ 
          statusCode:200, 
        //   body:JSON.stringify(Object.keys(res).map((i)=> res[i]))
        }
    }
    catch(err){
        console.error(err)
        return{
            statusCode:500, 
            body:JSON.stringify(err)
        }
    }
    

}