import { heroText } from '@/utils/texts';
import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

function Hero() {
	const props = useSpring({
		from: { opacity: 0, transform: 'translateY(-20px)' },
		to: { opacity: 1, transform: 'translateX(0px)' },
		config: { duration: 300 },
	});

	return (
		<section className="relative  bg-blueGray-50 ">
			<div className="relative pt-[7rem] md:pt-[15rem] pb-32 flex content-center items-center justify-center min-h-screen-75">
				<video
					autoPlay
					loop
					muted
					playsInline
					className="absolute z-[-1]  inset-0 w-full h-full object-cover object-center"
				>
					<source src={'./hero-video.mp4'} type="video/mp4" />
				</video>
				<div className="container  mx-auto ">
					<div className="items-center flex flex-wrap ">
						<animated.div
							style={props}
							className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center bg-black/70 "
						>
							<div className="">
								<h1 className="text-white font-semibold text-2xl md:text-5xl">
									{heroText[0].heroHeader}
								</h1>
								<p className="mt-4 text-md italic text-gray-100">
									{heroText[0].heroPitch}
								</p>
							</div>
						</animated.div>
					</div>
				</div>
			</div>
			<section className="pb-10 bg-blueGray-200 -mt-24 delay-200">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap">
						<div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
							<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
								<animated.div style={props} className="px-4 py-5 flex-auto ">
									<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-[#ff7a59]">
										<i className="fas fa-award"></i>
									</div>
									<h6 className="text-xl font-semibold">
										{heroText[1].heroHeader}
									</h6>
									<p className="mt-2 mb-4 text-blueGray-500">
										{heroText[1].heroPitch}
									</p>
								</animated.div>
							</div>
						</div>
						<div className="w-full md:w-4/12 px-4 text-center">
							<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
								<animated.div
									style={props}
									className="px-4 py-5 flex-auto 
                  "
								>
									<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-[#628baf]">
										<i className="fas fa-retweet"></i>
									</div>
									<h6 className="text-xl font-semibold">
										{heroText[2].heroHeader}
									</h6>
									<p className="mt-2 mb-4 text-blueGray-500">
										{heroText[2].heroPitch}
									</p>
								</animated.div>
							</div>
						</div>
						<div className="pt-6 w-full md:w-4/12 px-4 text-center">
							<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
								<animated.div style={props} className="px-4 py-5 flex-auto">
									<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
										<i className="fas fa-fingerprint"></i>
									</div>
									<h6 className="text-xl font-semibold">
										{heroText[3].heroHeader}
									</h6>
									<p className="mt-2 mb-4 text-blueGray-500">
										{heroText[3].heroPitch}
									</p>
								</animated.div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</section>
	);
}

export default Hero;
