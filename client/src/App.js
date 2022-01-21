import React, { useState, useEffect } from "react";
import { BsCloudUpload, BsTrash } from "react-icons/bs";
import { FaEye, FaTrash } from "react-icons/fa";
import { BsTrash2Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { delete_image, get_images, post_images } from "./redux/action";
import { DELETE_IMAGE_RESET, POST_IMAGE_RESET } from "./redux/constant";
import getBase64 from "./utils/getbase64";

const App = () => {
	const [imageFile, setImageFile] = useState("");
	const [imageFormat, setImageFormat] = useState("");
	const [pageNumber, setPageNumber] = useState(1);

	const dispatch = useDispatch();

	const getImages = useSelector((state) => state.getImages);
	const { loading, images } = getImages;

	const postImage = useSelector((state) => state.postImage);
	const { loading: loadingPost, success, error } = postImage;

	const deleteImage = useSelector((state) => state.deleteImage);
	const { loading: loadingDelete, success: successDelete } = deleteImage;

	useEffect(() => {
		dispatch(get_images(pageNumber));
		if (success || successDelete) {
			dispatch({ type: DELETE_IMAGE_RESET });
			dispatch({ type: POST_IMAGE_RESET });
			setImageFormat("");
			setImageFile("");
		}
	}, [success, successDelete, pageNumber]);

	const fileInputChange = (e) => {
		let file = e.target.files[0];

		getBase64(file)
			.then((result) => {
				file["base64"] = result;
				let split = file.base64.split(",");
				setImageFile(split[1]);
				let type = file.type.split("/");
				setImageFormat(type[1]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleFileUpload = async () => {
		const data = {
			type: imageFormat,
			value: imageFile,
		};
		dispatch(post_images(data));
	};

	const deleteImageHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(delete_image(id));
		}
	};

	const cancelImage = () => {
		setImageFile("");
		setImageFormat("");
		dispatch({ type: POST_IMAGE_RESET });
	};

	return (
		<div className="board">
			<div className="container">
				<div className="box">
					<div className="row">
						<div className="col-lg-4">
							<div className="image-box shadow-sm">
								{imageFile ? (
									<img
										src={`data:image/${imageFormat};base64,${imageFile}`}
										alt="User"
										className="img-fluid"
									/>
								) : (
									<p></p>
								)}
							</div>
							{imageFile ? (
								<div className="btns">
									<button
										className="site-btn up"
										onClick={handleFileUpload}
										disabled={loadingPost ? true : false}
									>
										{!loadingPost ? "Upload" : "Loading..."}
									</button>
									{!loadingPost && (
										<button
											className="site-btn can"
											onClick={cancelImage}
										>
											Cancel
										</button>
									)}
								</div>
							) : (
								<label className="btn-file">
									<BsCloudUpload /> Select an Image
									<input
										type="file"
										onChange={fileInputChange}
										accept="image/*"
									/>
								</label>
							)}
							<div className="mt-5">
								{error && (
									<p className="box-error">
										Unable to Post Image.
									</p>
								)}
							</div>
						</div>
						<div className="col-lg-8">
							<div className="card">
								<div className="card-body">
									{loading ? (
										<div className="text-center mt-3">
											<img
												src="/loading.gif"
												height={30}
											/>
											<p>Fetching Images...</p>
										</div>
									) : (
										<>
											{images &&
												images.images &&
												(images.images.length > 0 ? (
													<div className="images row">
														{images.images.map(
															(img) => (
																<div
																	className="col-lg-4 mb-3"
																	key={img.id}
																>
																	<div className="body-img shadow-sm">
																		<img
																			src={`data:image/${img.image_type};base64,${img.image_value}`}
																			alt="ImageFile"
																			className="img-fluid"
																		/>
																		<button
																			className="del"
																			onClick={() =>
																				deleteImageHandler(
																					img.id
																				)
																			}
																		>
																			<BsTrash2Fill
																				size={
																					13
																				}
																			/>
																		</button>
																	</div>
																</div>
															)
														)}

														{images.meta &&
															images.meta.pages >
																1 && (
																<div className="col-md-12 mt-4">
																	<div className="paginate">
																		{[
																			...Array(
																				images
																					.meta
																					.pages
																			).keys(),
																		].map(
																			(
																				x
																			) => (
																				<button
																					className={
																						pageNumber ===
																						x +
																							1
																							? "active"
																							: ""
																					}
																					onClick={() =>
																						setPageNumber(
																							Number(
																								x +
																									1
																							)
																						)
																					}
																				>
																					{x +
																						1}
																				</button>
																			)
																		)}
																	</div>
																</div>
															)}
													</div>
												) : (
													<div className="no-img">
														<p>
															No Image has been
															uploaded.
														</p>
													</div>
												))}
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
