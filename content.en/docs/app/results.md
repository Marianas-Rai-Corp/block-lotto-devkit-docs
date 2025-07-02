---
weight: 5
bookFlatSection: true
title: "Results"
---

# Results

## Overview

The Result component is supposed to reveal the payout of the purchased ticket. It can also show some elements of the background calculation that determined the payout amount.

## Component Logic

The payout amount is readily available from the `ticket` object. Additionally it is possible to show a part of the calculation process from which the payout amount is derived. In our example we show the `resultingNumbers`. These appear only in the second last step of the calculation. These four numbers added up into one sum can be compared with the `playerWinningTiers` and thereby explain the payout amount.

It is possible to use the pre-built state `gameTickets` and `setGameTickets` to control which tickets should be "gamed" and revealed. Here as well it is possible to change to other methods such as (using a query string)[].

![Win Example](/results/results-example.png)

![Loss Example](/results/results-loss-example.png)