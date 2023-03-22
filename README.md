# Techlab

Techlab is an application made specifically for UPC as the final project for one of its courses. The purpose of this project is to create an app capable of monitoring physical machines, manage users, reservations, permissions, etc.

In this application, you can do the following:
- ## List all the laboratories and machines in the system.

![Machine and Laboratory list](public/images/machines-laboratories.png)

- ## View dashboard and events created by admins.

![Dashboard view](public/images/dashboard.png)

- ## Create reservations for an existing machine.

You can only make a reservation on a future or actual day. If you choose to make a reservation for the actual day, only hours past the current (taking in consideration the user timezone) will be available. If a specific hour for a specific machine is already reserved by another user, it's unavailable to everyone else.

![Create reservation](public/images/make-reservation.png)

- ## View existing reservations.

If an active reservation is happening right now, you can choose to activate the machine from this view, otherwise the only way to activate the machine is via the RFID card. Users have the ability to delete future reservations in case they don't want to attend them anymore.

![Show reservations](public/images/show-reservations.png)

- ## View user information

Check your own information and edit it in case you want to change any of the fields provided.

![User information](public/images/user-info.png)

- ## List all admin actions in the admin panel.

![Admin actions](public/images/admin-panel.png)

- ## Create / edit laboratories.

![Create laboratory](public/images/laboratories.png)

![Edit laboratory](public/images/laboratories-edit.png)

- ## Create / edit machines.

![Create machine](public/images/machines.png)

![Edit machine](public/images/machines-edit.png)

- ## Solve RFID petitions.

![Rfid petitions](public/images/rfid.png)

![Rfid petition solve](public/images/rfid-edit.png)

- ## Show machine consumption.

![Machine consumption](public/images/consumption.png)

- ## Create events.

![Create Event](public/images/events.png)

- ## Manage users.

![Users list](public/images/users.png)

<img src="public/images/users-edit-admin.png"  width="500" height="300">

<img src="public/images/users-edit-normal.png"  width="500" height="300">

# License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
