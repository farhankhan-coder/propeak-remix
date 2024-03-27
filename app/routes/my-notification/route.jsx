import MyNotifications from "../../Components/my-notification/components/my-notifications";
import {getMyNotifications}  from "../../Services/my-notification/my-notification-service";

export async function loader({request}) {
    try {
      const myNotifications = await getMyNotifications();
      console.log(myNotifications, "notifying")
      return json({ myNotifications});
    } catch (error) {
      console.error("Error fetching myNotifications:", error);
      throw error;
    }
  }

export default function myNotificationRoute(){
    const {myNotifications}=useLoaderData()

    return(
    <div>
        <MyNotifications
        mynotify={myNotifications}
        />
    </div>
    )
}
