import * as React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map, Marker, Source, Layer, Popup } from 'react-map-gl';
import { MapboxAttributionControl } from 'react-map-gl/dist/esm/types';
import Filter from './Filter';
import Cards from './Card';
import Pin from './Pin';
import TungstenIcon from '@mui/icons-material/Tungsten';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import WavesIcon from '@mui/icons-material/Waves';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { TextInput, Button, Modal, Label, Textarea, Dropdown } from 'flowbite-react';
import { Toast } from 'flowbite-react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HandymanIcon from '@mui/icons-material/Handyman';
import { Rating } from 'flowbite-react';
import axios from "axios"; 

export default function Maper() {

  const [id, setID] = React.useState(0)
  const [data, setData] = React.useState([])
  const [markers, setMarkers] = React.useState([])
  const [filter,setFilter] = React.useState(null);
  const [response, setResponse] = React.useState("");

  




  const handleClick = (event) => {
    let lats = event.lngLat.lat
    let lons = event.lngLat.lng
    addLng(lons)
    addLat(lats)
    setOpenModal(true)

    //setMarkers(markers => [...markers, { longitude: lon, latitude: lat, type:"Park" }])
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(formData)
    setMarkers(markers => [...markers, { longitude: longs, latitude: lats, type: formData.type }])
    setID(id + 1)
    setData([...data, { id: id, longitude: longs, latitude: lats, type: formData.type, comments: formData.comments, authority: formData.authority }])
    console.log(data)
    
    


    setOpenModal(false)




  }

  const handleKeyDown=(event) => {
	   
    data.filter((item) => item.type==filter)
     
   };
  const handleSearch=(event) => {
	
   setFilter(event.target.value)

		//setRenderdata(data);
		
	};
  const [openModal, setOpenModal] = React.useState(false);
  const [pointData, setPointData] = React.useState(null);
  const [lng, setLng] = React.useState(-1.548567);
  const [lat, setLat] = React.useState(53.801277);
  const [longs, addLng] = React.useState(null);
  const [lats, addLat] = React.useState(null);
  const [zoom, setZoom] = React.useState(14);
  const [pitch, setPitch] = React.useState(60);
  const [popupInfo, setPopupInfo] = React.useState(null);
  const [formData, setFormData] = React.useState({
    type: "",
    comments: "Leave Comments...",
    authority: ["MP", "LCC", "Repair"],
  })

  return (
    <div class="grid grid-cols-5 gap-2">
      <div class="col-span-2 ..." >
        <div class="block max-w-md"  >
          <div style={{ marginLeft: "10pt", marginRight: "auto" }}>
            <div className="mb-2 block">
              <Label htmlFor="search" value="Search" />
            </div>
            <TextInput id="search" type="text" placeholder="Search filter" onChange={handleSearch} onKeyDown={handleKeyDown} />
          </div>
        </div>
        <div >

          {data?.map((i) => (<Cards heading={i.type} comment={i.comments} />))}
          <div></div>
          <Textarea placeholder={"Key concerns"} rows={4} style={{marginTop:"10pt"}}/>

        </div>
      </div>
      <div class="col-span-3 ...">
        <Map
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: zoom,
            pitch: pitch,

          }}
          style={{ width: "100%", height: "100vh" }}
          mapStyle="mapbox://styles/sazaidi/ckow1f4xy05id18pp2vm78red"
          mapboxAccessToken='token'
          MapboxAttributionControl={false}
          onClick={handleClick}

        >
          {markers.length ? markers.map((m, i) => (
            // <Marker /> just places its children at the right lat lng.
            <Marker key={i} longitude={m.longitude} latitude={m.latitude} onClick={e => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();
              setPopupInfo(m);
            }}>
              {m.type == "New Building" &&
                <AddBusinessIcon />
              }
              {m.type == "Park Suggestion" &&
                <LocalFloristIcon />
              }
              {m.type == "Flood Warning" &&
                <WavesIcon />
              }
              {m.type == "Street Lighting" &&
                <TungstenIcon />
              }

            </Marker>
          )) : null}

          {popupInfo && (
            <Popup
              anchor="top"
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              onClose={() => setPopupInfo(null)}
              maxWidth="600px"
            >
               <Rating>
      <Rating.Star />
      <Rating.Star />
      <Rating.Star />
      <Rating.Star />
      <Rating.Star filled={false} />
    </Rating>
            </Popup>
          )}


        </Map>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-2"  >
          <Modal.Header>Comments and Concerns</Modal.Header>
          <Modal.Body>

            <div className="space-y-4">
              <div className="max-w-md">

                <Dropdown label="Select Initative Type" value={formData.type} style={{ backgroundColor: "#000080" }} >
                  <Dropdown.Item onClick={(e) => setFormData({ ...formData, type: "Park Suggestion" })} icon={LocalFloristIcon}>Park Suggestion</Dropdown.Item>
                  <Dropdown.Item onClick={(e) => setFormData({ ...formData, type: "New Building" })} icon={AddBusinessIcon}>New Building</Dropdown.Item>
                  <Dropdown.Item onClick={(e) => setFormData({ ...formData, type: "Flood Warning" })} icon={WavesIcon}>Flood Warning</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={(e) => setFormData({ ...formData, type: "Street Lighting" })} icon={TungstenIcon}>Street Lighting</Dropdown.Item>
                </Dropdown>
              </div>
              <div className="max-w-md">
                <div className="mb-4 block">
                  <Label htmlFor="comment" value="Your message" />
                </div>
                <Textarea onChange={(e) => setFormData({ ...formData, comments: e.target.value })} id="comments" placeholder={formData.comments} required rows={4} />
                <Toast >
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                    <AccountBalanceIcon className="h-5 w-5" style={{ color: "#000080" }} />
                  </div>
                  <div className="ml-3 text-sm font-normal">Local Council</div>
                  <Toast.Toggle onClick={() => setFormData({ ...formData, authority: formData.authority = ["MP", "Repair"] })} />
                </Toast>
                <Toast>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                    <PersonPinIcon className="h-5 w-5" style={{ color: "#000080" }} />
                  </div>
                  <div className="ml-3 text-sm font-normal">MP</div>
                  <Toast.Toggle onClick={() => setFormData({ ...formData, authority: formData.authority = ["LCC", "Repair"] })} />
                </Toast>
                <Toast>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                    <HandymanIcon className="h-5 w-5" style={{ color: "#000080" }} />
                  </div>
                  <div className="ml-3 text-sm font-normal">Repair Department</div>
                  <Toast.Toggle onClick={() => setFormData({ ...formData, authority: formData.authority = ["MP", "LCC"] })} />
                </Toast>
                <div></div>

              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button type={"Submit"} style={{ backgroundColor: "#000080" }}>Submit</Button>



          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );




}