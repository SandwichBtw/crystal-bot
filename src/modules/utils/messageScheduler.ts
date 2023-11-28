import schedule from "node-schedule"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function loadSchedules() {
    schedule.scheduleJob('*/1 * * * *', testMessage)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function testMessage() {
    console.log("This runs every 1 minute.")
}