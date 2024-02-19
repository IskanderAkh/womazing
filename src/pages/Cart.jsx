import React, { useContext } from 'react'


import remove_icon from "../assets/img/cart_cross_icon.png"
import { ShopContext } from '../ShopContext'

import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
const Cart = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, orderItems } = useContext(ShopContext)

    return (
        <>
            <div>
                <h1 className='current-location'>Корзина</h1>
                <div className='current-location-link'><a href='/'>Главная </a> — <p>Корзина</p> </div>
            </div>
            <div className='cartitems'>
                <div className='cartitems-top'>

                    <div className="cartitems-format-main cart-items-left">
                        <p>Товар</p>

                        <p>Цена</p>
                        <p>Количество</p>
                        <p>Всего</p>

                    </div>
                    <hr />
                    < Swiper
                    
                        scrollbar={{
                            hide: false,
                        }}
                        slidesPerView={1}
                        modules={[Scrollbar]}
                        className="mySwiper"
                        breakpoints={{
                            240: { slidesPerView: 1 },
                            320: { slidesPerView: 1 },
                            430: { slidesPerView: 2 },
                            576: { slidesPerView: 3 },
                            768: { slidesPerView: 3 },
                            992: { slidesPerView: 1 },
                            
                        }}
                    >

                        {all_product.map((e) => {
                           
                            const cartItem = cartItems[e.id];
                            console.log(cartItem);
                            if (cartItem && cartItem.quantity > 0) {
                                return (
                                    <SwiperSlide>

                                        <div key={e.id} className='cart-slider'>
                                            <div className="cartItems-format cartitems-format-main">
                                                <div className='cartitems-format-main-first'>
                                                    <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                                                    <img src={e.img} alt="" className='carticon-product-icon' />
                                                    <div>
                                                        <p>{e.name}</p>
                                                        <p> Size: {cartItem.selectedSizes.map(size => size).join(', ')}</p>

                                                        <p> Color: {cartItem.selectedColors.map(color => color).join(', ')}</p>


                                                    </div>


                                                </div>
                                                <p className='cart-det'>${e.price}</p>
                                                <button className='cartitems-quantity'>{cartItem.quantity}</button>
                                                <p className='cart-det'>${e.price * cartItem.quantity}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            }
                            return <></>;
                        })}

                    </Swiper>
                </div>


                <div className="cartitems-down">
                    <div className="cartitems-total">
                        <div className="cartitems-promocode">

                            <div className="cartitems-promobox">
                                <input type="text" name="" placeholder='Введите купон' id="" />
                                <button>Применить купон</button>
                            </div>
                        </div>

                        <div className='cartitems-total-poditog'>
                            <div className="cartitems-total-item">
                                <p>Подытог:</p>
                                <p>${getTotalCartAmount()}</p>
                            </div>



                            <div className="cartitems-total-item-itog">
                                <div>
                                    <h3>Итого:</h3>
                                    <h3>${getTotalCartAmount()}</h3>
                                </div>
                                {getTotalCartAmount() > 0 && (
                                    <Link to={`/womazing/Order`}>Сделать заказ</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart