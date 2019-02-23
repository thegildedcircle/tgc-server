port module Engine exposing (main)

import Json.Encode as E
import Types exposing (..)
import Types.Encoders exposing (..)

-- Ports -----------------------------------------------------------------------
--|
port debugLog : E.Value -> Cmd action

-- Main ------------------------------------------------------------------------
--|
main : Program Flags Model Action
main = 
  Platform.worker
    { init = init 
    , update = update
    , subscriptions = subscriptions
    }

-- Model -----------------------------------------------------------------------
--|
type alias Model =
  { entities  : List Entity
  , log       : List Message
  }


type alias Flags =
  {
  }


init : Flags -> ( Model, Cmd action )
init flags =
  update 
    (LogMessage { id="0", content="Server reporting for duty", to="GLOBAL", from="SERVER" })
    { entities = [], log = [] }

-- Update ----------------------------------------------------------------------
--|
type Action
  = None
  | LogMessage Message


update : Action -> Model -> ( Model, Cmd action )
update action model =
  case action of
    LogMessage message ->
      ({ model | log = message :: model.log }, debugLog (encodeMessage message))

    None ->
      (model, Cmd.none)

subscriptions : Model -> Sub Action
subscriptions model =
    Sub.batch
      [ Sub.none
      ]