'use client'
import { Progress } from "@/components/ui/progress"
import {User, Mail, UserPen, ThumbsDown, LoaderCircle} from "lucide-react"

import { signOut } from "next-auth/react"
import { ThumbsUp } from "lucide-react"
import { useToast } from "@hooks/use-toast"
import { useRouter } from "@node_modules/next/navigation"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import { useState, useRef, useEffect } from "react"
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api'
import SessionCard from "./SessionCard"

function ProfileCard({
    profile,
    setProfile,
    session
}) {
    const router = useRouter()
    const [isSubmitting, setSubmitting] = useState(false)
    const {toast} = useToast()
    const lengthBool = Object.keys(profile).length !== 0
    const [copied, setCopied] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [autocomplete, setAutocomplete] = useState(null)
    const handleCopy = () =>{
        setCopied(true)
        navigator.clipboard.writeText(profile.email)
        setTimeout(() =>(
            setCopied(false)
        ), 3000)
    }
    const emailArray = useRef([])

    

    const handleMapClick = (event) => {
        setSelectedLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        })
    }

    const handlePlaceChanged = () => {
        if (autocomplete !== null) {
          const place = autocomplete.getPlace()
          if (place.geometry && place.geometry.location) {
            setSelectedLocation({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            })
        console.log('Place: ', place.geometry.location.lat(), place.geometry.location.lng())
          }
        } else {
          console.log('Autocomplete is not loaded yet!')
        }
      }

    const libraries = ['places']

    const handleDescSubmit = () => {
        const username = document.getElementById('profile_name').value
        const numOfStudents = document.getElementById('profile_students').value
        const location = selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : null

        const updateProfile = async () => {

            setSubmitting(true)

            try{
                const response = await fetch(`/api/users/${session.user.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        username: username,
                        numOfStudents: numOfStudents,
                        location: location
                    })

                })

                if(response.ok){
                    username ? setProfile({...profile, username: username}) : null
                    numOfStudents ? setProfile({...profile, numOfStudents: numOfStudents}) : null   
                    location ? setProfile({...profile, location: location}) : null
                    toast({
                        variant: 'success',
                        title: "Profile Updated",
                        description: "We have successfully updated the profile!",
                    })
                }
            }
            catch(err){
                toast({
                    variant: 'destructive',
                    title: "Failed to Update Profile",
                    description: "We encountered an error while trying to update the profile!",
                })
                console.log(err)
            }
            finally{
                setSubmitting(false)
                document.getElementById('profile_name').value = ''
                document.getElementById('profile_students').value = ''
                setSelectedLocation(null)
            }
        }

        updateProfile()

    }

    const handleDelete = () => {
        setSubmitting(true)
        const deleteUser = async() => {

            try{
                const response = await fetch(`/api/users/${session.user.id}`, {
                    method: 'DELETE'
                })
                if(response.ok){
                    signOut()
                    router.push('/')
                }
            }
            catch(err){
                console.log(err)
                toast({
                    variant: 'destructive',
                    title: 'Error in Deleting User',
                    description: "We ran into an error while deleting your account..."
                })
            }
            finally{
                setSubmitting(false)
            }
        }
        const confirmationEmail = document.getElementById('confirmation').value
        if(confirmationEmail === profile.email) deleteUser()
    }

    const handleEndorsement = () => {
        const increaseEndorsement =  async () => {
            setSubmitting(true)
            try{
                const response = await fetch(`/api/users/${profile._id}/endorse`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        endorsingUser: session.user.id
                    })

                })
                if(response.ok){

                    setProfile({
                        ...profile, 
                        endorsement: profile.endorsement+1,
                        endorsedBy:[...profile.endorsedBy, session.user.id]
                    })

                    toast({
                        variant: 'success',
                        title: "Successfully Endorsed!",
                        description: `You have successfully endorsed ${profile.username}`
                    })
                }

            }
            catch(err){
                console.log(err)
                toast({
                    variant: 'destructive',
                    title: 'Error in Endorsing User',
                    description: "We ran into an error while endorsing the user..."
                })
            }
            finally{
                setSubmitting(false)
            }
            
        }

        if(session?.user){
            increaseEndorsement()
        }
        else{
            toast({
                variant: 'destructive',
                title: 'Failed to Endorse',
                description: 'You are not logged in, please try again after logging in...'
            })
        }
        
    }

    const handleUnendorsement = () => {
        const decreaseEndorsement = async () => {
            setSubmitting(true)
            try{
                const response = await fetch(`/api/users/${profile._id}/deendorse`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        endorsingUser: session.user.id
                    })

                })
                if(response.ok){

                    const filteredList = profile.endorsedBy.filter((userID) => userID !== session.user.id)

                    setProfile({
                        ...profile,
                        endorsement: profile.endorsement-1, 
                        endorsedBy: filteredList
                    })

                    toast({
                        variant: 'success',
                        title: "Successfully Unendorsed!",
                        description: `You have successfully unendorsed ${profile.username}`
                    })
                }

            }
            catch(err){
                console.log(err)
                toast({
                    variant: 'destructive',
                    title: 'Error in Unendorsing User',
                    description: "We ran into an error while unendorsing the user..."
                })
            }
            finally{
                setSubmitting(false)
            }
        }

        decreaseEndorsement()
    }

    const night = [
        { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [{ color: "#4b6878" }],
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [{ color: "#64779e" }],
        },
        {
          featureType: "administrative.province",
          elementType: "geometry.stroke",
          stylers: [{ color: "#4b6878" }],
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.stroke",
          stylers: [{ color: "#334e87" }],
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry",
          stylers: [{ color: "#023e58" }],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#283d6a" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6f9ba5" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#1d2c4d" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#304a7d" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#98a5be" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#1d2c4d" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#2c6675" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#255763" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#b0d5ce" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#023e58" }],
        },
        {
          featureType: "transit",
          elementType: "labels.text.fill",
          stylers: [{ color: "#98a5be" }],
        },
        {
          featureType: "transit",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#1d2c4d" }],
        },
        {
          featureType: "transit.line",
          elementType: "geometry.fill",
          stylers: [{ color: "#283d6a" }],
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [{ color: "#3a4762" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#0e1626" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#4e6d70" }],
        },
      ];

      const containerStyle = {
        width: '100%',
        height: '100%'
      };

    const LoadingMessage = () => (
        <div className="flex justify-center items-center h-full">
            <LoaderCircle className="animate-spin w-24 h-24"/>
        </div>
    );

    useEffect(() => {
        emailArray.current = profile?.email?.split(/[@, .]/)
    }, [profile])

    return (
        <section className="mb-3 w-full">
        <div className="max-[1108px]:block  flex-start gap-3 w-full">
        {lengthBool ? (
            <>
        <div className=" min-h-[355px] border border-zinc-500 bg-zinc-100/[0.5] px-16 py-8 rounded-xl max-[865px]:block flex-center max-[1108px]:mb-3 max-[1108px]:w-full gap-8 w-full">
            <div className="w-full my-12 flex-center">
                <h1
                className={'text-6xl font-bold font-arial black_gradient pb-3'}
                >
                    {profile.username}
                </h1>
            </div>
        </div>
        <div
        className="max-[865px]:block max-[1108px]:flex max-[1108px]:gap-3"
        >
        <div className="max-[550px]:block max-[1108px]:flex gap-3 profileSm:max-[1108px]:w-2/3 max-[865px]:w-full"
        >
        
        <div className="min-w-[235px] border border-zinc-500 relative bg-zinc-100/[0.5] h-52 rounded-xl flex-center max-[1108px]:w-1/2 max-[550px]:w-full cursor-pointer"
        onClick={() => handleCopy()}
        >
            {!copied ? (
            <Mail className="w-32 h-32 text-zinc-700 hover:w-36 hover:h-36 transition-all"/>
            ) : (
            <>
            <div className="w-full">
            <h1
            className="px-2 text-balance flex-center w-full text-xl font-semibold"
            >
                {emailArray.current[0]} {'[AT]'}
            </h1>
            <h1
            className="w-full border-2 border-zinc-100 flex-center px-2 text-balance text-xl font-semibold"
            >
                {emailArray.current[1]} {'[DOT]'} {emailArray.current[2]}
            </h1>
            </div>
            <p className="absolute bottom-0 w-full text-center text-sm text-zinc-700 mb-2">
            Copied to clipboard!
            </p>
            </>
            )}
        </div>
        {session?.user.id === profile._id ? (
        <Drawer>
            <DrawerTrigger className="max-[1108px]:w-1/2 max-[550px]:w-full mt-4 max-[550px]:mt-3 max-[1108px]:mt-0">
            <div
            className="flex-center border border-zinc-500 bg-[#141414cc] rounded-xl h-[130px] text-4xl w-[270px] max-[1108px]:h-52 "
            >
                <UserPen className="h-20 w-20 hover:h-24 hover:w-24 transition-all text-zinc-100"/>
            </div>
            </DrawerTrigger>
            <DrawerContent
            className='px-4 '
            >
                <DrawerHeader>
                    <DrawerTitle className='text-xl flex-start'>Edit Profile</DrawerTitle>
                    <DrawerDescription className='text-zinc-600 -mt-1 flex-start'>Make Changes to your profile.</DrawerDescription>
                </DrawerHeader>
                <div
                className="mx-4 mb-10 mt-1"
                >
                <label className="font-satoshi font-bold text-sm text-black tracking-wide mt-2 pr-8">School Name</label>
                <input type="text"
                id="profile_name"
                placeholder="Please enter your new name"
                className="text-sm font-medium font-inter border border-gray-300 px-2 mt-2 rounded py-2 outline-none focus:border-gray-900 w-full h-10 mb-2"
                />
                <label className="font-satoshi font-bold text-sm text-black tracking-wide mt-2 pr-8">Location</label>
            
                <div className="h-56 w-full mb-2">
                    <LoadScript libraries={libraries} loadingElement={<LoadingMessage />} googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
                    <Autocomplete
                    onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                    onPlaceChanged={handlePlaceChanged}
                >
                    <input type="text"
                        id="profile_location"
                        placeholder="Please enter your new location"
                        className="text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 outline-none focus:border-gray-900 w-full h-10 mb-2"
                    />
                </Autocomplete>
                <div className="h-44 w-full mb-2 border border-gray-300">
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={{ lat: 38.8462, lng: -77.3064 }}
                        zoom={12}
                        onClick={(e) => handleMapClick(e)}
                    >
                        {selectedLocation && (
                            <Marker position={selectedLocation} />
                        )}
                    </GoogleMap>
                    </div>
                    </LoadScript>
                    </div>
                <label className="font-satoshi font-bold text-sm text-black tracking-wide mt-6 pr-8">Number of Students</label>
                <input type="text"
                id="profile_students"
                placeholder="Please enter your new student amount"
                className="text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 outline-none focus:border-gray-900 w-full h-10"
                />
                <div
                className="flex-between gap-3"
                >
                <button
                className="black_btn mt-6"
                disabled={isSubmitting}
                onClick={() => handleDescSubmit()}
                > {isSubmitting ? 'Submitting...': 'Submit' } 
                </button>
                <Dialog>
                    <DialogTrigger
                    disabled={isSubmitting}
                    >
                    <div
                    className="rounded-full border-[2px] border-black bg-red-800 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center mt-6"
                    >
                        Delete Profile?
                    </div>
                    </DialogTrigger>
                    <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                        <input
                        type="text"
                        id='confirmation'
                        placeholder="Please confirm by entering your email"
                        className="mt-2 text-sm font-medium font-inter border border-gray-300 px-2 rounded py-2 w-full outline-none focus:border-gray-900"
                        />
                        <button
                        type="button"
                        disabled={isSubmitting}
                        className="black_btn mt-3"
                        onClick={() => handleDelete()}
                        >
                            I understand
                        </button>
                    </DialogContent>
                </Dialog>
                </div>
                </div>
            </DrawerContent>
        </Drawer>
        ) : (
            !profile.endorsedBy.includes(session?.user.id) ? (
            <button
            onClick={() => handleEndorsement()}
            disabled={isSubmitting}
            className="mt-3 flex-center border border-zinc-500 bg-zinc-100/50 rounded-xl h-[130px] min-w-[235px] text-4xl w-full max-[1108px]:h-52 "
            >
                <ThumbsUp className={`h-20 w-20 hover:h-24 hover:w-24 transition-all text-zinc-700 ${isSubmitting ? ('animate-bounce fill-blue-200') : ''}`}/>
            </button>
            ) : (
                <button
                disabled={isSubmitting}
                onClick={() => handleUnendorsement()}
                className="mt-3 flex-center border border-zinc-500 bg-zinc-100/50 rounded-xl h-[130px] min-w-[235px] text-4xl w-full max-[1108px]:h-52 "
                >
                    <ThumbsUp className={`h-20 w-20 hover:h-24 hover:w-24 transition-all text-zinc-700 fill-blue-500 ${isSubmitting ? ('animate-bounce fill-blue-200') : ''}`}/>
                </button>
            )
        )}
        </div>
        </div>
        
        </>) : (
        <>
        <div className="animate-pulse bg-zinc-200 rounded-xl max-[1108px]:w-full h-[355px] max-profileSm:h-[800px] max-profileMd:mb-3 w-full"/>
        <div
        className="max-[865px]:block max-[1108px]:flex max-[1108px]:gap-3"
        >
        <div className="max-[550px]:block max-[1108px]:flex gap-3 profileSm:max-[1108px]:w-2/3 max-[865px]:w-full">
        
        <div className="min-w-[235px] h-52 rounded-xl max-[1108px]:w-1/2 max-[550px]:w-full animate-pulse bg-zinc-200 ">
        </div>
        <div
        className="mt-4 animate-pulse bg-zinc-200 rounded-xl h-[130px] min-w-[235px] text-4xl max-[1108px]:w-1/2 max-[550px]:w-full max-[550px]:mt-3 max-[1108px]:h-52 max-[1108px]:mt-0"
        >    
        </div>
        </div>
        <div
            className="bg-zinc-200 h-52 rounded-xl py-4 max-profileSm:mt-3 max-profileMd:w-full profileMd:hidden"
            >
            </div>
        
        </div>
        </>
        )}
        
        </div>
        <div className="w-full flex gap-3 mt-3">
            <div className="w-1/2 bg-[#141414cc] h-52 rounded-xl py-4 flex-center border border-zinc-500">
                <h1 className="font-bold rounded-xl text-zinc-100 text-4xl">Number of Students: {profile.numOfStudents}</h1>
            </div>
            <div className="w-1/2 bg-[#141414cc] h-52 rounded-xl flex-center border border-zinc-500">
            {profile.location.length !== 0 ? (
            <LoadScript 
            className='rounded-xl'
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} 
        loadingElement={<LoadingMessage />}
        
        >
            <GoogleMap className="custom-map-container rounded-xl"
                mapContainerStyle={containerStyle}
                center={{
                    lat: profile.location[0],
                    lng: profile.location[1]
                }}
                zoom={12}
                options={{
                    styles: night,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            
            >
                
                <Marker position={{
                    lat: profile.location[0],
                    lng: profile.location[1]
                }} />
                
            </GoogleMap>
        </LoadScript>
        ) : null}
            </div>
        </div>
        <div className="flex gap-3 w-full">
        
        {parseInt(profile.requestsList.grain) > 0 && (<div
        className="w-1/3 mt-3 rounded-md px-4 py-2 border border-zinc-500 bg-zinc-100/[0.5] "
        
        >
           <div className='flex-between text-black'>
                <h1 className='font-bold'>
                    Grains
                </h1>
                <button className='black_btn' onClick={() => handleDonate()}>
                    Donate
                </button>
           </div>

           <Progress value={parseInt(profile.requestsList.grainAmount)/parseInt(profile.requestsList.grain)} className='mt-3' />
            <p className="flex-end text-sm font-satoshi font-semibold mt-1">{profile.requestsList.grainAmount}/{profile.requestsList.grain} lbs</p>
            
        </div>)}
        
        {parseInt(profile.requestsList.fruits) > 0 && (
        <div
        className="w-1/3 mt-3 rounded-md px-4 py-2 border border-zinc-500 bg-zinc-100/[0.5] "
        
        >
           <div className='flex-between text-black'>
                <h1 className='font-bold'>
                    Fruits
                </h1>
                <button className='black_btn' onClick={() => handleDonate()}>
                    Donate
                </button>
           </div>

           <Progress value={parseInt(profile.requestsList.fruitsAmount)/parseInt(profile.requestsList.fruits)} className='mt-3' />
            <p className="flex-end text-sm font-satoshi font-semibold mt-1">{profile.requestsList.fruitsAmount}/{profile.requestsList.fruits} lbs</p>
            
        </div>)}


        {parseInt(profile.requestsList.vegetables) > 0 && (
        <div
        className="w-1/3 mt-3 rounded-md px-4 py-2 border border-zinc-500 bg-zinc-100/[0.5] "
        
        >
           <div className='flex-between text-black'>
                <h1 className='font-bold'>
                    Vegetable
                </h1>
                <button className='black_btn' onClick={() => handleDonate()}>
                    Donate
                </button>
           </div>

           <Progress value={parseInt(profile.requestsList.vegetablesAmount)/parseInt(profile.requestsList.vegetables)} className='mt-3' />
            <p className="flex-end text-sm font-satoshi font-semibold mt-1">{profile.requestsList.vegetablesAmount}/{profile.requestsList.vegetables} lbs</p>
            
        </div>)}

        

        </div>
        <div className="flex w-full gap-3 ">

        {parseInt(profile.requestsList.protein) > 0 && (
        <div
        className="w-1/3 gap-3 mt-3 rounded-md px-4 py-2 border border-zinc-500 bg-zinc-100/[0.5] "
        
        >
           <div className='flex-between text-black'>
                <h1 className='font-bold'>
                    Proteins
                </h1>
                <button className='black_btn' onClick={() => handleDonate()}>
                    Donate
                </button>
           </div>

           <Progress value={parseInt(profile.requestsList.proteinAmount)/parseInt(profile.requestsList.protein)} className='mt-3' />
            <p className="flex-end text-sm font-satoshi font-semibold mt-1">{profile.requestsList.proteinAmount}/{profile.requestsList.protein} lbs</p>
            
        </div>)}


        {parseInt(profile.requestsList.dairy) > 0 && (
        <div
        className="w-1/3 mt-3 rounded-md px-4 py-2 border border-zinc-500 bg-zinc-100/[0.5] "
        
        >
           <div className='flex-between text-black'>
                <h1 className='font-bold'>
                    Dairy
                </h1>
                <button className='black_btn' onClick={() => handleDonate()}>
                    Donate
                </button>
           </div>

           <Progress value={parseInt(profile.requestsList.dairyAmount)/parseInt(profile.requestsList.dairy)} className='mt-3' />
            <p className="flex-end text-sm font-satoshi font-semibold mt-1">{profile.requestsList.dairyAmount}/{profile.requestsList.dairy} lbs</p>
            
        </div>)}

        </div>
        </section>
    )
}

export default ProfileCard