# Fallen London Conversion Helper

An unofficial extension for [Fallen London](http://fallenlondon.storynexus.com/) that makes converting certain kinds of items easier.

This extension adds some new sections to the top of the Inventory section of the 'Myself' tab: one each for tiers 1–4, and one for faction-related items. They're collapsed by default, but you can click to expand them. (You can choose which sections to show and hide in your preferences.)

<div class="image-container">
  ![Screenshot](https://i.imgur.com/hOAaSVm.png)
</div>

Each 'Tier X' section contains the convertible items you own in that tier,
arranged by each item's category's place in the Tier 3 side-conversion chain (starting with Academic, and ending with Rumour). Missing items in each section are indicated by an empty slot.
By default, an item's icon is disabled (greyed out) if you don't have enough of it to perform the (slightly profitable) mass-conversion action. (You can change this in your preferences.)

![Screenshot](https://i.imgur.com/TprSfaJ.png)

The Faction Items section contains any of the items you own that are connected to the factions in the game that use Favours and Renown. The quantity indicator on the icon shows how many of that faction's Favours you have. By default, if you don't have enough Favours to convert into Renown with that faction, the item is disabled.

![Screenshot](https://i.imgur.com/ZKGmRnQ.png)

## Preferences

There are a few ways in which you can change the extension's behaviour, available on the extension's popup menu.

![Screenshot](https://i.imgur.com/lB5Jd9n.png)

You can hide sections completely by editing the options in the popup menu.

You can change the behaviour of the 'Tier X' sections so that an item is enabled if you can perform the smaller conversion action, or so that tier items are always enabled.

Similarly, you can change the default behaviour of faction items, so that they're always enabled. This might be useful if you want to change your Quirks.
