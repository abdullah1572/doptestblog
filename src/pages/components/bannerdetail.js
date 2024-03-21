import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useParams } from "react-router-dom";

const Bannerdetail = () => {

    const [scrollProgress, setScrollProgress] = useState(0);
    const [ids, setIds] = useState();
    const [press, setallpress] = useState();
    // console.log("press we get ++++++++++++++", press)
    const [opens, setOpens] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const handleScroll = (event) => {
            const { scrollTop, scrollHeight, clientHeight } = event.target.documentElement;
            const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
            setScrollProgress(scrollPercentage);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const params = useParams();
    // console.log("params id",params.id)
    useEffect(() => {
     if(ids){
        AllPress(ids)
     }
    }, [ids]);


    const [linkUser, setlinkuser] = useState();
    const [linkText, setlinktext] = useState();
    useEffect(() => {
        var val = window.location.href;
        setlinkuser(val)
        setlinktext(press?.title?.rendered + '\u{1F680}' + '\n')
        val = new URL(val);
        setIds(val.searchParams.get('id'));
        // if (ids) {
        //     AllPress();
        // }
    }, []);

    console.log("asaasas", ids)

    useEffect(() => {
        var val = window.location.href;
        setlinkuser(val)
        setlinktext(press?.title?.rendered + '\u{1F680}' + '\n')
    }, [press]);

    const AllPress = (id) => {
        setOpens(true);
        setLoading(true);
        let limit = 1000
        axios
            .get(`https://blogs.dop.org/wp-json/wp/v2/posts?slug=${id}`)
            .then((response) => {
                // console.log("responce", response)
                setOpens(false);
                setallpress(response?.data?.[0]);
                setlinktext(press?.title?.rendered + '\u{1F680}' + '\n')
                setLoading(false);
            })
            .catch((err) => {
                setOpens(false);
                setLoading(false);
                toast.warning(
                    'Error',
                    {
                        position: 'top-right',
                        autoClose: 3000,
                    }
                );
                return false;
            });
    };

    // useEffect(() => {
    //     if (press) {
    //         updateMetaTags(press.title.rendered, press.uagb_featured_image_src.full[0]);
    //     }
    // }, [press]);

    const twiterPost = async () => {
        console.log("asdasdas")
        const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(linkUser)}&text=${encodeURIComponent(correcturl4)}`;
        window.open(tweetUrl, '_blank');
        
    }
    const wahtsapp = async () => {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${correcturl4} ${linkUser}`)}`;
        window.open(whatsappUrl, '_blank');
        
    }
    const shareWhatsApp = () => {
        if (!press) return; // Check if blog post data is available
        const message = `${correcturl4} ${linkUser}`;
        const imageUrl = press.uagb_featured_image_src.full[0];
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}&image=${encodeURIComponent(imageUrl)}`;
        window.open(whatsappUrl, '_blank');
    }

    // const updateMetaTags = (title, imageUrl) => {
    //     document.querySelector('meta[property="og:title"]').setAttribute('content', title);
    //     document.querySelector('meta[property="og:image"]').setAttribute('content', imageUrl);
    // };

    // const facebook = async () => {
    //     const facebookUrl = `https://www.facebook.com/dialog/share?app_id=YOUR_APP_ID&display=popup&href=${encodeURIComponent(linkUser)}&quote=${encodeURIComponent(correcturl4)}`;
    //     window.open(facebookUrl, '_blank');
    //     clickApi('copyFaceBook')
    // }
    const taligram = async () => {
        const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(linkUser)}&text=${encodeURIComponent(correcturl4)}`;

        // Open the Telegram share link in a new window
        window.open(shareUrl, '_blank');
        // clickApi('copyTelegram')
    }

    const rendered = (data) => {
        const originalText = data;
        const correctedText = originalText?.replace(/&#8217;/g, "'");
        const correctedText2 = correctedText?.replace(/&#8216;/g, "'");
        const correctedText3 = correctedText2?.replace(/&#8211;/g, "-");
        const correctedText4 = correctedText3?.replace(/&#038;/g, "&");
        const correctedText5 = correctedText4?.replace(/&#8221;/g, '"');
        return correctedText5;
    }

    const orignalurl = linkText
    const correcturl = orignalurl?.replace(/&#8217;/g, "'");
    const correcturl1 = correcturl?.replace(/&#8216;/g, "'");
    const correcturl2 = correcturl1?.replace(/&#8211;/g, "-");
    const correcturl3 = correcturl2?.replace(/&#038;/g, "&");
    const correcturl4 = correcturl3?.replace(/&#8221;/g, '"');


    return (
        <>
            <section className="blog-detail">
                <div className="custom-container">
                    <div className="upper-bar">
                        <div className='parent-bar'>
                            <div
                                style={{
                                    width: `${scrollProgress}%`,
                                    height: '100%',
                                    backgroundColor: '#fff',
                                    transition: 'width 0.3s',
                                }}
                            ></div>
                        </div>
                    </div>
                    {
                        loading ? <div className="set-loading-mid">
                            <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p style={{ color: "#fff" }}>Loading...</p>
                        </div>
                            :
                            <div className="parent-content">
                                <div className="left-side">
                                    <div className="back-btn">
                                        <Link href="/banner"> <button><img src="\assets\blog\back-arrow.svg" alt="img" className='img-fluid' /></button></Link>
                                    </div>
                                    <div className="heading-main">
                                        <h4>{rendered(press?.title?.rendered)}</h4>
                                        <div className="inner-twice-text">
                                            <p>POSTED ON {" "} 
                                            {press?.date
                                ?.slice(0, 10)
                                .split('-')
                                .reverse()
                                .join('-')}
                                                </p>
                                        </div>
                                        <div className="bottom-social">
                                            <a onClick={shareWhatsApp}><img src="\assets\partners\whatsapp.svg" alt="img" className='img-fluid' /></a>
                                            <a onClick={taligram}><img src="\assets\partners\telegram.svg" alt="img" className='img-fluid' /></a>
                                            {/* <a href="#"><img src="\assets\partners\mail.svg" alt="img" className='img-fluid' /></a> */}
                                            <a onClick={twiterPost}><img src="\assets\partners\twitter.svg" alt="img" className='img-fluid' /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-side-content">
                                    <div className="main-img-blogdetail">
                                        <img src={press?.uagb_featured_image_src?.full[0]} alt="img" className='img-fluid' />
                                    </div>
                                    <div className="single-head" dangerouslySetInnerHTML={{
                                        __html: press?.content.rendered,
                                    }}>
                                    </div>

                                </div>
                            </div>
                    }

                </div>
            </section>
        </>
    )
}

export default Bannerdetail
