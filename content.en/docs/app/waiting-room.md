---
weight: 4
bookFlatSection: true
title: "Waiting Room"
---

# Waiting Room

## Overview

The Waiting Room is an optional component of the app. When a ticket has been purchased and broadcast to the blockchain it will take some time until the block will be mined. Only then the ticket can be redeemed. The expected time to wait at any random point in time is 10 minutes but times vary and ranges from seconds to 10s of minutes. During this waiting period the user could stay in the app and wait for his ticket to be redeemedable. When ready the user can redeem the awaited ticket from this component.

This component however can also be used as the standard flow to redeem tickets. Then, the above mentioned method could be a special case of the redemption flow.

## Component Logic

There is an inbuilt state `ticketsToRedeem` which can be used to manage ticket redemption. At the end of checkout, the tickets purchased will be automatically set into this property and are removed upon redemption. It is possible to add tickets to this state via `setTicketsToRedeem` which can be used in the ticket history: Upon clicking "Redeem Ticket" the ticket is added via `setTicketsToRedeem` and can then be accessed in the Waiting Room component.

In case a custom solution via url query is preferred, please see (this example)[] as reference.

Before attempting to redeem a ticket it is required to use the function `checkTicketredeemability`. This function first checks if the locally stored data allow for a redemption. If negative, it will fetch the transaction data from an eCash node. Depending on the custom user flow, it is possible to use the `checkTicketRedeemability` function for polling the eCash node. Thereby, the function will check repeatedly if a ticket is already redeemable. This is how the function is used in the code snippet below while the user can wait and/or see some other content.

![Waiting Example](/waiting-room/waiting-room-example.png)

![Redeemable Example](/waiting-room/waiting-room-ready-example.png)
