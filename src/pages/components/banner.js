import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from 'axios';

const Banner = () => {
  const [press, setallpress] = useState();

  const AllPress = () => {
    // setOpens(true);
    // setLoading(true);
    // let limit = 1000
    // console.log(press)
    axios
      .get(`https://blogs.dop.org/wp-json/wp/v2/posts?per_page=100`)
      .then((response) => {
        setallpress(response?.data);
        // console.log("response", response)
        // setOpens(false);
        // // var arr = response?.data;
        // // var theRemovedElement = arr.shift();
        // setallpress(response?.data);
        // setLoading(false);
        // setallpresstop(theRemovedElement)
      })
      .catch((err) => {
        console.log("error", err)
        // setOpens(false);
        // setLoading(false);
        // toast.warning(
        //     'Error',
        //     {
        //         position: 'top-right',
        //         autoClose: 3000,
        //     }
        // );
        return false;
      });
  };
  useEffect(() => {
    AllPress();
  }, []);



  return (
    <>
      <section className="main-banner">
        <img src="\assets\landing\static\banner-img-shadow.png" alt="img" className='img-fluid banner-img-shadow' />
        <div className="custom-container">
          <div className="row mt-5">
            {press?.map((card, index) => (
              // <div key={index}>
              <div key={index} className="col-xl-4 col-12 m-auto padd-sm mb-5">
                <Link  href={`/bannerdetail/?id=${card.slug}`}>
             
                    <img src={card?.uagb_featured_image_src?.full[0]} alt="img" className='imghere' />
                    <h2 className='asdasdghasd'>{card?.title.rendered}</h2>
                    <button>Share Wattsup</button>
              
                </Link>
                </div>
              // </div>

            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Banner
