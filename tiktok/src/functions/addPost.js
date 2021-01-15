const {createClient} = require("@astrajs/collections");
const collection = "testCol";

exports.handler = async function(event, context, callback) {
    const astraClient = await createClient({
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        username: process.env.ASTRA_DB_USERNAME,
        password: process.env.ASTRA_DB_PASSWORD,
    });    

    console.log(astraClient);
    const posts = astraClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection(collection);

    const body = JSON.parse(event.body)
    console.log(body.id)

    try{
        await posts.create(body.id, body)
            return {
                statusCode:200,
            }
    }
    catch(e){
        console.error("EEE",e)
        return{
            statusCode:500,
            body:JSON.stringify(e)
        }
    }

}