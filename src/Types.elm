module Types exposing (..)

-- Event -----------------------------------------------------------------------
--|
type alias Message =
  { id        : String
  , content   : String
  , to        : String
  , from      : String
  }

-- Entity ----------------------------------------------------------------------
--|
type alias Entity =
  { id : String
  , components : List Component
  }

-- Entity Constructors ---------------------------------------------------------
--|
constructPlayer : String -> String -> Entity
constructPlayer id name =
  { id = "P+" ++ id
  , components = 
    [ Name name
    , Level 1 0
    , Inventory []
    , Attributes
      { health = 100.0
      }
    ]
  }

--|
constructItem : String -> String -> Int -> Entity
constructItem id name value =
  { id = "I+" ++ id
  , components = 
    [ Name name
    , Value value
    ]
  }

-- Entity Checkers -------------------------------------------------------------
--|
isPlayer : Entity -> Bool
isPlayer e =
  let
    required =
      [ isNameComponent
      , isLevelComponent
      , isInventoryComponent
      , isAttributesComponent
      ]
  in
  List.map (\fn -> List.any fn e.components) required
    |> List.foldl (&&) True

--|
isItem : Entity -> Bool
isItem e =
  let
    required =
      [ isNameComponent
      , isValueComponent
      ]
  in
  List.map (\fn -> List.any fn e.components) required
    |> List.foldl (&&) True

-- Components ------------------------------------------------------------------
--|
type Component
  = Value Int 
  | Equippable EquipSlot
  | Name String
  | Level Int Int
  | Inventory (List Entity)
  | Attributes
    { health : Float
    }

-- Component Checkers ----------------------------------------------------------
--|
isValueComponent : Component -> Bool
isValueComponent c =
  case c of
    Value _ -> 
      True
    _ ->
      False

--|
isEquippableComponent : Component -> Bool
isEquippableComponent c =
  case c of
    Equippable _ -> 
      True
    _ ->
      False

--|
isNameComponent : Component -> Bool
isNameComponent c =
  case c of
    Name _ -> 
      True
    _ ->
      False

--|
isLevelComponent : Component -> Bool
isLevelComponent c =
  case c of
    Level _ _ -> 
      True
    _ ->
      False

--|
isInventoryComponent : Component -> Bool
isInventoryComponent c =
  case c of
    Inventory _ -> 
      True
    _ ->
      False

--|
isAttributesComponent : Component -> Bool
isAttributesComponent c =
  case c of
    Value _ -> 
      True
    _ ->
      False

-- Other Types -----------------------------------------------------------------
--|
type EquipSlot
  = Head
  | Torso
  | Legs
  | Gloves
  | Shoes
  | MainHand
  | OffHand
  | RingOne
  | RingTwo