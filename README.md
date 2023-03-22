# Techlab

Techlab is an application made specifically for UPC as the final project for one of its courses. The purpose of this project is to create an app capable of monitoring physical machines, manage users, reservations, permissions, etc.

In this application, you can do the following:
- ## List all the laboratories and machines in the system.

Lists all the current laboratories (with their assigned campus room) and all the machines with information on which laboratory they belong to.

![Machine and Laboratory list](public/images/machines-laboratories.png)

- ## View dashboard and events created by admins.

Default view once the user logs in, where a list of all the events the admin have created appears. Only admins can delete the events, normal users don't have the ability to do so.

![Dashboard view](public/images/dashboard.png)

- ## Create reservations for an existing machine.

You can only make a reservation on a future or actual day. If you choose to make a reservation for the actual day, only hours past the current (taking in consideration the user timezone) will be available. If a specific hour for a specific machine is already reserved by another user, it's unavailable to everyone else.

If a user has a lower authorization level than the level required to operate a specific machine, the machine will be unavailable.

![Create reservation](public/images/make-reservation.png)

- ## View existing reservations.

If an active reservation is happening right now, you can choose to activate the machine from this view, otherwise the only way to activate the machine is via the RFID card. Users have the ability to delete future reservations in case they don't want to attend them anymore.

![Show reservations](public/images/show-reservations.png)

- ## View user information

Check your own information and edit it in case you want to change any of the fields provided.

![User information](public/images/user-info.png)

- ## List all admin actions in the admin panel.

Only admins can view and access this panel.

![Admin actions](public/images/admin-panel.png)

- ## Create / edit laboratories.

A list of existing laboratories is shown as well as a form to input the information of the laboratory to create in case the admin wishes to.

![Create laboratory](public/images/laboratories.png)

![Edit laboratory](public/images/laboratories-edit.png)

- ## Create / edit machines.

A list of existing machines is shown as well as a form to input the information of the machine to create in case the admin wishes to.

![Create machine](public/images/machines.png)

![Edit machine](public/images/machines-edit.png)

- ## Solve RFID petitions.

In order to solve a petition, the admin needs to have the code of the RFID that will be assigned to the user, otherwise it's pointless since the user ultimately needs a physical copy of the RFID card with the same code as the one inserted here.

![Rfid petitions](public/images/rfid.png)

![Rfid petition solve](public/images/rfid-edit.png)

- ## Show machine consumption.

A list of the existing machines is shown, and when one of those is selected, two graphs appear below. One of the graphs is a real time consumption indicator and the other collects the average consumption of the last 5 days.

![Machine consumption](public/images/consumption.png)

- ## Create events.

Admins can create events in order to broadcast important news to regular users, such as when a new laboratory is available or perhaps new machines assigned to different laboratories.

![Create Event](public/images/events.png)

- ## Manage users.

Users management, where admins can choose to remove admin priviledges to existing admins, or make regular users admins. There is also the chance to modify the authorization level of all users.

![Users list](public/images/users.png)

Admin management           |  Normal user management
:-------------------------:|:-------------------------:
![Admin](public/images/users-edit-admin.png)  |  ![Normal user](public/images/users-edit-normal.png)

# License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
