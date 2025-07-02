---
weight: 6
bookFlatSection: true
title: "Wallet"
---

# Wallet

## Overview

The `Wallet`component contains all details regarding the user's eCash wallet and their account. 

## Component Logic

Several states can be used to display wallet data. For the ticket history `tickets`, `redeemableTickets`, `unredeemedTickets` can be used as well as the detailed data in every `ticket` object and `ticket.parsed`. Please see our example of parsing the ticket data (here)[]. The user's address is available in `wallet.Path1899.cashAddress`, the email from the `email` state. The secret seed phrase of the wallet that is required for importing the wallet on another device or browser is available in `wallet.mnemonic`. 

Two important functionalities are available in this component: changing the user's email address and changing the user's wallet. The email address can be changed with the`changeEmail` function. Another seed phrase for the wallet can be imported using `importWallet`.

![Tickets Example](/wallet/tickets-example.png)

![Open Ticket Example](/wallet/ticket-open-example.png)

![Wallet Example](/wallet/wallet-example.png)

![Import Example](/wallet/import-example.png)

![Export Example](/wallet/export-example.png)

![Email Example](/wallet/email-example.png)

![Address Example](/wallet/address-example.png)