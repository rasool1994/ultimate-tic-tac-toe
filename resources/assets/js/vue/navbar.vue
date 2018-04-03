<template>
    <!--Navigation-->
    <div id="main_nav" class="main-nav">
        <div class="container">

            <a id="navigation" class="navigation-btn hidden-xl-up" href="#"><i class="fa fa-bars"></i></a>
            <!--sideNav-->
            <div id="slide_out_menu" class="slide_out_menu">
                <a href="#" class="menu-close"><i class="fa fa-times"></i></a>
                <div class="logo"><span style="color: white;">DoozDooz</span></div>
                <ul>
                    <li>
                        <router-link to="/bar">Tour</router-link>
                    </li>
                    <li>
                        <router-link to="/bar">Features</router-link>
                    </li>
                    <li>
                        <router-link to="/bar">Pricing</router-link>
                    </li>
                    <li>
                        <router-link to="/bar">Help</router-link>
                    </li>
                    <li>
                        <router-link to="/bar/100">Contacts</router-link>
                    </li>
                    <li>
                        <router-link to="/bar" class="btn btn-download-app"><i
                                class="fa fa-gamepad"></i>Get App
                        </router-link>
                    </li>
                </ul>

                <div class="slide_out_menu_footer">
                    <div class="more-info">
                        <p>Made with love by <a href="http://doozdooz.com/">Dooz
                            Dooz</a></p>
                        <p>Developed by <a href="http://doozdooz.com/">Rasool
                            Karami</a></p>
                    </div>
                    <ul class="socials">
                        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i class="fab fa-facebook"></i></a></li>
                        <li><a href="#"><i class="fab fa-google-plus"></i></a></li>
                        <li><a href="#"><i class="fab fa-tumblr"></i></a></li>
                        <li><a href="#"><i class="fab fa-pinterest-p"></i></a></li>
                        <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
                    </ul>
                </div>
            </div>

            <!--topNAv-->
            <div class="row top-nav">
                <div class="col-md-4">
                    <ul class="left">
                        <li class="hidden-xl-down">
                            <router-link to="/bar">Tour</router-link>
                        </li>
                        <li class="hidden-xl-down">
                            <router-link to="/bar">Features</router-link>
                        </li>
                        <li class="hidden-xl-down">
                            <router-link to="/bar">Pricing</router-link>
                        </li>
                    </ul>
                </div>
                <div class="col-md-4 text-center">
                    <span href="#" class="logo">DoozDooz</span>
                </div>
                <div class="col-md-4">
                    <ul class="right">
                        <li class="hidden-xl-down">
                            <router-link to="/bar">Help</router-link>
                        </li>
                        <li class="hidden-xl-down">
                            <router-link to="/foo">Contacts</router-link>
                        </li>
                        <li>
                            <router-link to="/bar" class="btn btn-download-app"><i
                                    class="fa fa-gamepad"></i>Get App
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style rel="stylesheet/scss" href="./style.css" lang="scss" type="text/scss" scoped>

    .top-nav {
        flex-wrap: nowrap;
    }

    @media (min-width: 1200px) {
        .hidden-xl-up {
            display: none;
        }
    }

    @media (max-width: 1199px) {
        .hidden-xl-down {
            display: none !important;
        }
    }

    .btn-download-app {
        font-size: 16px;
        font-weight: 400;
        padding: 9px 16px;
        text-decoration: none;
        color: #26272d;
        border: 1px solid rgba(38, 39, 45, 0.1);
        border-radius: 30px;
        -moz-border-radius: 30px;
        -webkit-border-radius: 30px;
        @extend .btn-blue;
    }

    .btn-blue {
        background-color: #267df4;
        color: white;
    }

    /*****************************************************
    *** Main Nav ***
    *****************************************************/
    .main-nav {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        padding: 44px 0;
        font-size: 16px;
        z-index: 10;
        background-color: transparent;
        webkit-transition: all 0.37s cubic-bezier(0, 0, 0.58, 1);
        transition: all 0.37s cubic-bezier(0, 0, 0.58, 1);
    }

    .main-nav .navigation-btn {
        color: #26272d;
        text-decoration: none;
        position: absolute;
        top: 52%;
        margin-top: -16px;
        z-index: 2;
    }

    .main-nav .navigation-btn:hover {
        color: #267df4 !important;
    }

    .main-nav ul {
        padding: 0;
    }

    .main-nav ul li {
        display: inline-block;
        margin-right: 40px;
    }

    .main-nav ul li a {
        color: #26272d;
        text-decoration: none;
    }

    .main-nav ul li a:hover {
        color: #267df4;
    }

    .main-nav ul li .help {
        color: rgba(38, 39, 45, 0.4);
    }

    .main-nav ul li .btn-blue {
        color: #ffffff;
    }

    .main-nav ul li .btn-blue:hover {
        color: #ffffff;
    }

    .main-nav ul li:last-child {
        margin-right: 0;
    }

    .main-nav ul.left {
        text-align: left;
        margin-left: 50px;
        margin-bottom: 0;
    }

    .main-nav ul.left li {
        display: inline-block;
        padding: 9px 0;
    }

    .main-nav ul.left li:first-child {
        margin-right: 30px;
    }

    .main-nav ul.right {
        text-align: right;
        margin-bottom: 0;
    }

    .main-nav .logo {
        display: inline-block;
        padding-top: 11px;
    }

    .main-nav .slide_out_menu {
        position: fixed;
        display: block;
        width: 380px;
        max-width: 650px;
        height: 100%;
        left: -380px;
        top: 0;
        padding: 40px;
        z-index: 50;
        background: #26272d;
        transition: left 0.7s cubic-bezier(0.545, 0, 0.05, 1);
    }

    .main-nav .slide_out_menu .menu-close {
        position: absolute;
        color: #ffffff;
        right: 20px;
        top: 52px;
    }

    .main-nav .slide_out_menu ul {
        margin-top: 40px;
    }

    .main-nav .slide_out_menu ul li {
        display: block;
        margin: 10px 0;
    }

    .main-nav .slide_out_menu ul li a {
        color: #ffffff;
    }

    .main-nav .slide_out_menu ul li a:hover {
        color: #267df4;
    }

    .main-nav .slide_out_menu ul li .btn-blue:hover {
        color: #ffffff;
    }

    .main-nav .slide_out_menu ul li:last-child {
        margin-top: 20px;
    }

    .main-nav .slide_out_menu .slide_out_menu_footer {
        position: absolute;
        display: block;
        width: 100%;
        left: 0;
        bottom: 0;
        padding: 20px 40px 25px;
    }

    .main-nav .slide_out_menu .slide_out_menu_footer .more-info p {
        font-size: 14px;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.8);
        margin: 0;
    }

    .main-nav .slide_out_menu .slide_out_menu_footer .socials {
        margin: 18px 0 0;
    }

    .main-nav .slide_out_menu .slide_out_menu_footer .socials li {
        display: inline-block;
        margin: 0 20px 0 0;
    }

    .main-nav .slide_out_menu .slide_out_menu_footer .socials li a {
        color: rgba(255, 255, 255, 0.8);
        transition: all .2s ease-in-out;
    }

    .main-nav .slide_out_menu .slide_out_menu_footer .socials li a:hover {
        color: #ffffff;
    }

    .main-nav .slide_out_menu .slide_out_menu_footer .socials li:last-child {
        margin-right: 0;
    }

    .main-nav .slide_out_menu.xs-screen {
        overflow-y: auto;
    }

    .main-nav .slide_out_menu.xs-screen ul {
        margin-top: 40px;
    }

    .main-nav .slide_out_menu.xs-screen .slide_out_menu_footer {
        position: relative;
        padding: 0;
        margin-top: 40px;
    }

    .main-nav .slide_out_menu.xs-screen .slide_out_menu_footer .more-info p {
        font-size: 14px;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.8);
        margin: 0;
    }

    .main-nav .slide_out_menu.xs-screen .slide_out_menu_footer .socials {
        margin: 18px 0 0;
    }

    .main-nav .slide_out_menu.xs-screen .slide_out_menu_footer .socials li {
        display: inline-block;
        margin: 0 20px 0 0;
    }

    .main-nav .slide_out_menu.xs-screen .slide_out_menu_footer .socials li a {
        color: rgba(255, 255, 255, 0.8);
        transition: all .2s ease-in-out;
    }

    .main-nav .slide_out_menu.xs-screen .slide_out_menu_footer .socials li a:hover {
        color: #ffffff;
    }

    .main-nav .slide_out_menu.xs-screen .slide_out_menu_footer .socials li:last-child {
        margin-right: 0;
    }

    .main-nav .slide_out_menu.open {
        left: 0;
    }

    .main-nav.active {
        background-color: #ffffff;
        padding: 24px 0;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
        -ms-box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
        -webkit-box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
    }


</style>

<script type="text/babel">

    $(document).ready(function () {
        // Navigation
        $('.navigation-btn').on('click', function (e) {
            e.preventDefault();
            $(this).addClass('open');
            $('.slide_out_menu').toggleClass('open');

            if ($('.slide_out_menu').hasClass('open')) {
                $('.menu-close').on('click', function (e) {
                    e.preventDefault();
                    $('.slide_out_menu').removeClass('open');
                })
            }
        });
    });

    // Scroll Events
    $(window).scroll(function () {

        let wScroll = $(this).scrollTop();

        // Activate menu
        if (wScroll > 20) {
            $('#main_nav').addClass('active');
            $('#slide_out_menu').addClass('scrolled');
        }
        else {
            $('#main_nav').removeClass('active');
            $('#slide_out_menu').removeClass('scrolled');
        }

        //Scroll Effects

    });


</script>