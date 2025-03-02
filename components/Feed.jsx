'use client'
import SessionCard from "./SessionCard"
import { useState, useEffect, useRef, useCallback } from "react"
import {Responsive, WidthProvider } from "react-grid-layout"
import  {Search}  from "lucide-react"
import {ChevronLast, ChevronFirst, Hand} from 'lucide-react'
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "@node_modules/next-auth/react"

const ResponsiveGridLayout = WidthProvider(Responsive)

function Feed({
    post,
    isSubmitting,
    currentPage,
    setCurrentPage,
    currentItems,
    setCurrentItems,
    itemsPerPage,
    indexOfFirstItem,
    indexOfLastItem,
    search,
    setSearch,
    
}){
    const router = useRouter()
    const pathname = usePathname()
    const detailsRef = useRef(null)
    const {data: session} = useSession()
    const preventFirstRender = useRef(true)
    const predefinedLayout = [
            { i: "searchName", x: 0, y: 0, w: 1, h: 1, static: true},
            { i: "searchTags", x: 0, y: 1, w: 1, h: 1, static: true},
            { i: "pagination", x: 2, y: 0, w: 1, h: 1},
            { i: "tip", x: 1, y: 0, w: 1, h: 1},
            { i: "details", x: 1, y: 1, w: 2, h: 5},
            { i: "0", x: 0, y: 2, w: 1, h: 4},
            { i: "1", x: 0, y: 7, w: 1, h: 4},
            { i: "2", x: 1, y: 6, w: 1, h: 4},
            { i: "3", x: 2, y: 6, w: 1, h: 4},
            { i: "4", x: 0, y: 11, w: 1, h: 4},
            { i: "5", x: 1, y: 10, w: 1, h: 4},
            { i: "6", x: 2, y: 10, w: 1, h: 4},
            { i: "7", x: 0, y: 15, w: 1, h: 4},
            { i: "8", x: 1, y: 14, w: 1, h: 4},
            { i: "9", x: 2, y: 14, w: 1, h: 4},
            { i: "10", x: 0, y: 19, w: 1, h: 4},
            { i: "11", x: 1, y: 18, w: 1, h: 4},
            
          ];

    const breakpoints = { lg: 1150, sm: 768, xs: 480};
    const cols = { lg: 3, sm: 2, xs: 1};
    
    const [isDragging, setDragging] = useState(null);
    
    const onDragStart = (layout, oldItem, newItem, placeholder, e, element) => {
        setDragging(newItem.i);

    }
    const onDragStop = (layout, oldItem, newItem, placeholder, e, element) => {
        setDragging(null);
    }

    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }

    
    const [layout, setLayout] = useState(predefinedLayout)
    const [currentLayout, setCurrentLayout] = useState(predefinedLayout)
    //const [width, setWidth] = useState(0)

    /*
    useEffect(() => {
    const handleMouseMove = () => {
        setWidth(window.innerWidth);
        
    };

    window.addEventListener("resize", handleMouseMove);
    
    return () => {
        window.removeEventListener("resize", handleMouseMove);
        
    };
    }, []);
    */

    const handleSearchChange = (query) => {
        setSearch(query);
        setCurrentPage(1)
        
    };


    const filteredPosts = post ? (post.filter(event => 
        event.description.toLowerCase().includes(search.description.toLowerCase()) &&
        event.tags.some(tag => tag.toLowerCase().includes(search.tags.toLowerCase()))
    )) : [];



    

    useEffect(() => {
        const index = filteredPosts.length
        if(currentItems.length < 10){
            if(detailsRef.current){
                const detailsHeight = detailsRef.current.innerText.length;
                const updatedLayout = predefinedLayout.map(item => {
                    if (item.i === "details") {
                        return { ...item, h: 5 + Math.floor(detailsHeight / 250) }; // Assuming rowHeight is 45
                    }
                    return item;
                });
                setLayout(updatedLayout.slice(0, index+5))
            }
            else setLayout(predefinedLayout.slice(0, index+5))
        }
        else{
            const index = filteredPosts.length
            if(detailsRef.current){
                const detailsHeight = detailsRef.current.innerText.length;
                const updatedLayout = predefinedLayout.map(item => {
                    if (item.i === "details") {
                        return { ...item, h: 5 + Math.floor(detailsHeight / 250) }; // Assuming rowHeight is 45
                    }
                    return item;
                });
                setLayout(updatedLayout.slice(0, index+5))
            }
            else setLayout(predefinedLayout.slice(0, index+5))

        }

    }, [search])

    useEffect(() => {
        setCurrentItems(filteredPosts.slice(indexOfFirstItem, indexOfLastItem));
        
    }, [search, currentPage])

        useEffect(() => {

        if(currentItems.length < 10){
            if(detailsRef.current) {
                const detailsHeight = detailsRef.current.innerText.length;
                const updatedLayout = predefinedLayout.map(item => {
                    if (item.i === "details") {
                        return { ...item, h: 5 + Math.floor(detailsHeight / 250) }; // Assuming rowHeight is 45
                    }
                    return item;
                });
                setLayout(updatedLayout)
            }
            else setLayout(predefinedLayout)
        }
    }, [currentPage])

    const onBreakpointChange = (newBreakpoint) => {
        // Reset layout to predefined layout when breakpoint changes
        const detailsHeight = detailsRef.current.innerText.length;
        const updatedLayout = predefinedLayout.map(item => {
            if (item.i === "details") {
                return { ...item, h: 5 + Math.floor(detailsHeight / 250) }; // Assuming rowHeight is 250
            }
            return item;
        });
        setLayout(updatedLayout);
        
    }

    useEffect(() => {
        if(preventFirstRender.current){
            preventFirstRender.current = false
        }
        else{
            if (detailsRef.current) {
            const detailsHeight = detailsRef.current.innerText.length;
            const updatedLayout = predefinedLayout.map(item => {
                if (item.i === "details") {
                    return { ...item, h: 5 + Math.floor(detailsHeight / 250) }; // Assuming rowHeight is 250
                }
                return item;
            });
            setLayout(updatedLayout.slice(0, filteredPosts.length +5));
            }
        }

    }, [post])

    const onLayoutChange = (newLayout) => {

        setCurrentLayout(newLayout)
    }

    const handlePageClick = (index) => {
        setCurrentPage(index)
        setLayout(currentLayout)
    }

    const formatTime = (time) => {
        if(Number(time.slice(0, 2)) > 12){
            return `${Number(time.slice(0, 2)) - 12}:${time.slice(3, 5)} PM`
        }
        if(Number(time.slice(0, 2)) === 12){
            return `${Number(time.slice(0, 2))}:${time.slice(3, 5)} PM`
        }
        if(time.slice(0, 2) === '00'){
            return `12:${time.slice(3, 5)} AM`
        }
        else{
            return `${time.slice(0, 2)}:${time.slice(3, 5)} AM`
        }

    }

    return(
        <>
        {post.length > 0 ? (
        <div className="grid-container w-full min-h-[500px]">
          <ResponsiveGridLayout
            className="layout w-full h-full"
            cols={cols}
            layouts={{lg: layout}}
            autoSize={true}
            breakpoints={breakpoints}
            rowHeight={45}
            width={1150}
            isDraggable={false}
            useCSSTransforms={true}
            onDragStart={onDragStart}
            onDragStop={onDragStop}
            onLayoutChange={onLayoutChange}
            containerPadding={[0, 0]}
            onBreakpointChange={onBreakpointChange}
            draggableCancel=".cancelSelector"
            
          >
            <div key="searchName" 
            className={`border border-zinc-500 font-normal text-black text-4xl bg-zinc-100 flex-center`}
            >
                <form
                className="w-full block rounded-md flex-start gap-2 px-2" 
                >   
                    <label>
                    <Search className="w-[28px] h-[28px] text-black mt-[2px]"/>
                    </label>
                    <input
                    value={search.description}
                    placeholder='Search by description'
                    onChange={(e) => handleSearchChange({...search, description: e.target.value})}
                    className="text-lg font-semibold outline-none w-full bg-transparent placeholder-zinc-500"
                    />
                </form>
            </div>
            <div key="searchTags" 
            className={`font-normal text-black text-xl flex-center bg-zinc-100 border border-zinc-500`}
            >
                <form
                className="w-full block rounded-md px-2 gap-2 flex-center"
                >   
                    <label>
                    <Search className="w-[28px] h-[28px] text-black mt-[2px]"/>
                    </label>
                    <input
                    value={search.tags}
                    placeholder='Search by tags'
                    onChange={(e) => handleSearchChange({...search, tags: e.target.value})}
                    className="font-semibold text-lg outline-none w-full bg-transparent placeholder-zinc-500"
                    />
                </form>
            </div>
            <div key="pagination" 
            className={`bg-zinc-100/[0.8] border border-zinc-500 overflow-hidden text-black flex-center  px-2 ${isDragging === 'pagination' ? 'dragging z-10' : ''}`}>
                <div className="flex-center gap-x-1">
                <button 
                className="flex gap-2 text-black font-semibold rounded-xl px-4 py-1 hover:bg-black hover:bg-black hover:text-white hover:shadow-lg transition-all cancelSelector"
                onClick={() => handlePageClick(1)}
                >
                    <ChevronFirst /> First
                </button>
                <div className="gap-x-1 flex-center">
                    {currentPage === 1 ? null : (
                    <button
                    key={currentPage-1}
                    className=" cancelSelector text-black font-semibold rounded-lg px-4 py-1 hover:bg-black hover:text-white hover:shadow-lg transition-all"
                    onClick={() => handlePageClick(currentPage-1)}
                    >
                        {currentPage-1}

                    </button>
                    )
                    }
                    <button
                    key={currentPage}
                    className="cancelSelector text-black border border-zinc-500 font-semibold rounded-lg px-4 py-1 hover:bg-black hover:text-white hover:shadow-lg transition-all"
                    
                    >
                        {currentPage}
                    </button>
                    {Math.ceil(filteredPosts.length / itemsPerPage) >= currentPage+1 ? (
                    <button
                    key={currentPage+1}
                    className="cancelSelector text-black font-semibold rounded-lg px-4 py-1 hover:bg-black hover:text-white hover:shadow-lg transition-all"
                    onClick={() => handlePageClick(currentPage+1)}
                    >
                        {currentPage+1}
                    </button>
                    ) : null
                    }
                </div>
                <button 
                className="cancelSelector flex gap-2 text-black font-semibold rounded-xl px-4 py-1 hover:bg-black hover:text-white hover:shadow-lg transition-all"
                onClick={() => handlePageClick(Math.ceil(filteredPosts.length / itemsPerPage))}
                >
                    Last <ChevronLast />
                </button>
                </div>
            </div>
            <div key="tip" 
            className={`bg-[#141414cc] overflow-hidden text-white ${isDragging === 'tip' ? 'dragging' : ''}`}>
                <h1
                className="px-4 py-1 font-bold text-2xl text-gray-300 font-cyber whitespace-nowrap animate-marquee"
                >Hold and drag to move the cards. Click to display details of the card. Try it out!
                </h1>
            </div>
           
            {
                currentItems.map((event, index) => (
                    <div
                    key={index}
                    className={`glass_gradient border-[1px] border-zinc-400 ${isDragging === index.toString() ? 'dragging z-10' : ''} w-full`}
                    
                    >
                    <SessionCard

                    event={event}
                    handleCardClick={handleCardClick}
                    isSubmitting={isSubmitting}
                    />
                    </div>
                    ))
                
            }
          </ResponsiveGridLayout>
          </div>
        ) : 
        null
        }
        </>
        
        
    )
}

export default Feed