module Types.Encoders exposing (..)

import Json.Decode as D
import Json.Encode as E
import Types exposing (..)

-- Encoders --------------------------------------------------------------------
--|
encodeMessage : Message -> E.Value
encodeMessage message =
  E.object
    [ ("id", E.string message.id)
    , ("content", E.string message.content)
    , ("to", E.string message.to)
    , ("from", E.string message.from)
    ]

--|
encodeEntity : Entity -> E.Value
encodeEntity entity =
  E.object
    [ ("id", E.string entity.id)
    , ("components", E.list encodeComponent entity.components)
    ]

--|
encodeComponent : Component -> E.Value
encodeComponent component =
  case component of
    Value val ->
      E.object
        [ ("type", E.string "value")
        , ("value", E.int val)
        ]

    Equippable slot ->
      E.object
        [ ("type", E.string "equippable")
        , ("slot", encodeEquipSlot slot)
        ] 

    Name name ->
      E.object
        [ ("type", E.string "name")
        , ("name", E.string name)
        ]

    Level level exp ->
      E.object
        [ ("type", E.string "level")
        , ("level", E.int level)
        , ("exp", E.int exp)
        ]

    Inventory inventory ->
      E.object
        [ ("type", E.string "inventory")
        , ("inventory", E.list encodeEntity inventory)
        ]

    Attributes attrs ->
      E.object
        [ ("type", E.string "attributes")
        , ("health", E.float attrs.health)
        ]

--|
encodeEquipSlot : EquipSlot -> E.Value
encodeEquipSlot slot =
  case slot of
    Head ->
      E.string "head"

    Torso ->
      E.string "torso"     

    Legs ->
      E.string "legs" 

    Gloves ->
      E.string "gloves"

    Shoes ->
      E.string "shoes"

    MainHand ->
      E.string "main_hand"

    OffHand ->
      E.string "off_hand"

    RingOne ->
      E.string "ring_one"

    RingTwo ->
      E.string "ring_two"

-- Decoders --------------------------------------------------------------------
