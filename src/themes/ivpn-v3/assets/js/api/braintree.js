
import braintree from 'braintree-web'

function createClient (clientToken) {

    return new Promise( (resolution, rejection) => {
        braintree.client.create(
            { authorization: clientToken }, 
            ( err, clientInstance ) => {
                if (err) {
                    rejection(err);
                    return;
                }

                resolution(clientInstance);
            });
    } );
}

async function collectFraudData(client) {
    return new Promise( (resolution, rejection) => {
        braintree.dataCollector.create(
            {
                client,
                kount: true,
                paypal: true
            },
            function (err, dataCollectorInstance) {
                if (err) {
                    rejection(err);
                    return;
                }

                resolution(dataCollectorInstance.deviceData);                    
            }
        );
    });
}

export default {

    async init(clientToken) {

        try {
            let client = await createClient(clientToken)
            let fraudData = await collectFraudData(client)

            return {
                client: client,
                clientToken: clientToken,
                fraudData: fraudData,
                err: undefined,
            }

        } catch (err) {
            
            console.error(err);
            return {
                instance: undefined,
                clientToken: undefined,
                fraudData: undefined,
                err: err
            }
        }
    }
}