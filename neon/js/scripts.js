$(document).ready(function() {


    // Default for init

    const defaultsNeon = {
        'fontFamily': 'AA Neon',
        'textShadow': `#fff 0px 0px 5px,
                       #fff 0px 0px 10px,
                       #40b008 0px 0px 20px,
                       #40b008 0px 0px 30px,
                       #40b008 0px 0px 40px,
                       #40b008 0px 0px 55px,
                       #40b008 0px 0px 75px
                    `,
        'sizeHeightCm': 10,
        'textAlign': 'left',
    };


    // Change background

    $('.js-neon-changebg').on('click', function(e) {
        e.preventDefault();
        const _this = $(this);
        if (_this.hasClass('neon-backgrounds__btn--active')) return;

        _this.closest('.neon-backgrounds').find('.neon-backgrounds__btn--active').removeClass('neon-backgrounds__btn--active');
        _this.addClass('neon-backgrounds__btn--active');

        const background = _this.data('background');
        $('.js-neon-bg').css('background-image', `url(${background})`);
    });
    

    // Change textarea value

    $('.js-neon-textarea').on('input', function(e) {
        
        let text = $(this).val();
        text = text.replaceAll('<br><br>', '<br>');
        const matches = text.match(/\n/g);
        let resLines = (matches) ? text.match(/\n/g).length : 0;
        if (text.length) {
            resLines++;
        }

        // если несколько строк, то умножаем на коэффициент, его тоже гдето скрытым инпутом спрятать
        // а, и коэффициент зашить, на который будет умножаться цена буквы при увеличении высоты на 1 пх
        
        if (resLines > 1) {
            const valueArrBr = text.split('\n');
            const valueArrMaxString = getMaxLineLength(valueArrBr);

            const stringLength = text.length;
            const letterHeight = $('.js-neon-numberbox-input').val();
            const letterRatio = $('.neon-sidebox__btn--active[data-btn-type="font"]').data('font-height-ratio');
            
            let returnText = '';
            let linesCount = 0;
            for(let i = 0; i < valueArrBr.length; i++) {
                const splittedData = splitStringByChunks(valueArrBr[i], letterHeight, letterRatio);
                linesCount += splittedData.countLoops;    
                returnText += splittedData.finalString + '<br>';
            }
            returnText = returnText.replaceAll('<br><br>', '<br>');
            returnText = returnText.substring(0, returnText.length - 4);

            $('.js-neon-text').html(nl2br(returnText));
            calculateSizesRules(text, letterHeight, letterRatio, linesCount);
            calculateTotalPrice(stringLength, linesCount);
            calculateSizesRules(valueArrMaxString, letterHeight, letterRatio, linesCount, true);
        } else {
            setText(text);
        }

    });


    // Count value max lenght in lines

    const getMaxLineLength = (arr) => {
        let currentLength = 0;
        let string = '';
        for (let i = 0; i < arr.length; i++) {
            if (currentLength < arr[i].length) {
                currentLength = arr[i].length;
                string = arr[i];
            }
        }

        return string;
    };


    // Buttons

    $('.js-neon-btn').on('click', function(e) {
        e.preventDefault();

        const _this = $(this);
        if (_this.hasClass('neon-sidebox__btn--active')) return;

        _this.closest('.neon-sidebox').find('.neon-sidebox__btn--active').removeClass('neon-sidebox__btn--active');
        _this.addClass('neon-sidebox__btn--active');

        const buttonType = _this.data('btn-type');
        switch (buttonType) {
            case 'font':
                const font = _this.data('font');

                setFont(font);
            break;

            case 'color':
                const colorHex = _this.data('color-value');
                const colorName = _this.data('color-name');
                const textShadow = `
                    #fff 0px 0px 5px,
                    #fff 0px 0px 10px,
                    #${colorHex} 0px 0px 20px,
                    #${colorHex} 0px 0px 30px,
                    #${colorHex} 0px 0px 40px,
                    #${colorHex} 0px 0px 55px,
                    #${colorHex} 0px 0px 75px
                `;

                setNeon(textShadow);
                $('.js-color-name').text(colorName);
                break;

            case 'textAlign':
                const textAlign = _this.data('text-align');

                setTextAlign(textAlign);
                break;

            case 'backboardcolor':
                const backboardcolorName = _this.data('backboardcolor-name');
                const backboardcolorImg = _this.data('backboardcolor-img');

                setBackboardColor(backboardcolorImg);
                $('.js-backboardcolor-name').text(backboardcolorName);
                break;

            case 'mountingtype':
                const mountingtypeName = _this.data('mountingtype-name');
                const mountingtypeImg = _this.data('mountingtype-img');

                setMountingType(mountingtypeImg);
                $('.js-mountingtype-name').text(mountingtypeName);
                break;

            case 'connectiontype':
                const connectiontypeName = _this.data('connectiontype-name');
                const connectiontypeImg = _this.data('connectiontype-img');

                setConnectionType(connectiontypeImg);
                $('.js-connectiontype-name').text(connectiontypeName);
                break;
                
            case 'dimmer':
                const dimmerName = _this.data('dimmer-name');
                const dimmerImg = _this.data('dimmer-img');
                const dimmerPrice = _this.data('dimmer-price');

                setDimmer(dimmerImg, dimmerPrice);
                $('.js-dimmer-name').text(dimmerName);
                break;

            default:
                break;
        }

    });


    $('.js-neon-numberbox-btn').on('click', function(e) {
        e.preventDefault();
        const neonNumberboxInput = $(this).parents('.neon-numbersbox').find('.js-neon-numberbox-input');
        let neonNumberboxInputValue = neonNumberboxInput.val();

        if ( $(this).hasClass('neon-numbersbox__button--minus') ) {
            if (neonNumberboxInputValue <= 10) return;
            neonNumberboxInput.val(parseInt(neonNumberboxInputValue) - 1);
            setFontSizeRatio('minus');
        } else {
            if (neonNumberboxInputValue >= 30) return;
            neonNumberboxInput.val(parseInt(neonNumberboxInputValue) + 1);
            setFontSizeRatio('plus');
        }


        const text = $('.js-neon-text').text();
        const stringLength = text.length;
        const letterHeight = $('.js-neon-numberbox-input').val();
        const letterRatio = $('.neon-sidebox__btn--active[data-btn-type="font"]').data('font-height-ratio');
        const stringAfterSplitting = splitStringByChunks(text, letterHeight, letterRatio);
        const linesCount = stringAfterSplitting.countLoops;

        $('.js-neon-text').html(nl2br(stringAfterSplitting.finalString));

        calculateSizesRules(text, letterHeight, letterRatio, linesCount);
        calculateTotalPrice(stringLength, stringAfterSplitting.countLoops);
        
    });


    // js-neon-imgbg-hidden
    // js-neon-textpos-hidden
    // js-neon-fontfamily-hidden
    // js-neon-color-hidden
    // js-neon-size-hidden
    // js-neon-backboard-hidden
    // js-neon-mountingtype-hidden
    // js-neon-connectiontype-hidden
    // js-neon-dimmer-hidden
    // js-neon-thickness-hidden
    // js-neon-waterproofing-hidden
    // js-neon-mockupconfirmation-hidden


    // Options setters

    const setFont = (font) => {
        $('.js-neon-text').css('font-family', font);
    };

    const setTextAlign = (position) => {
        $('.js-neon-text').css('text-align', position);
    };

    const setNeon = (textShadow) => {
        $('.js-neon-text').css('text-shadow', textShadow);
    };


    const setText = (text) => {
        setTimeout(() => {

            const stringLength = text.length;
            const letterHeight = $('.js-neon-numberbox-input').val();
            const letterRatio = $('.neon-sidebox__btn--active[data-btn-type="font"]').data('font-height-ratio');
            
            const stringAfterSplitting = splitStringByChunks(text, letterHeight, letterRatio);
            const linesCount = stringAfterSplitting.countLoops;
            
            $('.js-neon-text').html(nl2br(stringAfterSplitting.finalString));
            calculateSizesRules(text, letterHeight, letterRatio, linesCount);
            calculateTotalPrice(stringLength, linesCount);

        }, 100);
    };
    

    const calculateSizesRules = (text, letterHeight, letterRatio, linesCount, isOneLine = false) => {
        if (isOneLine) {
            linesCount = 1;
        }
        letterHeight = linesCount > 1 ? letterHeight * linesCount : letterHeight;
        const letterWidth =  Math.round(letterHeight * letterRatio);
        const stringLength = text.length;
        const ruleWidth = (stringLength * letterWidth >= 200) ? 200 : stringLength * letterWidth;

        if (!isOneLine) {
            $('.neon-container-text__lineleft span').text(letterHeight + 'cm');
        }
        $('.neon-container-text__linebottom span').text(ruleWidth + 'cm');
    };
    
    
    const calculateTotalPrice = (lenght, linesCount) => {

        // Значение первой колонки (название Неон) * коэффициент (задается в админке - я его назвал fontRatio1)
        // + стоимость подложки (прямоугольной (S пр) или фигурной (S фиг) какая выбрана) * количество букв * коэффициент (задается в админке - я его назвал fontRatio2)
        // + (количество резов * число букв) округленное до верхнего целого * стоимость реза (задается в админке)

        // Да, 2 кэффициента, один это число строк умноженное на коэфф, прибавляем к итоговой стоимости

        // Второй это при инкременте высоты буквы на 1см, на него умножаем
        // типо считаем для базовой высоты , а далее каждый инкремент на 1с высоты - это будет умножении цены на кожфф

        const neonValue = $('.neon-sidebox__btn--active[data-btn-type="font"]').data('font-neon-value');
        const fontRatio1 = $('.neon-sidebox__btn--active[data-btn-type="font"]').data('font-ratio1');
        const fontRatio2 = $('.neon-sidebox__btn--active[data-btn-type="font"]').data('font-ratio2');
        const fontSpr = $('.neon-sidebox__btn[data-btn-type="font"]').data('font-spr');
        const fontSfig = $('.neon-sidebox__btn[data-btn-type="font"]').data('font-sfig');
        const fontSprOrSfig = $('.neon-sidebox__btn[data-btn-typebg-name="shape"]').hasClass('neon-sidebox__btn--active') ? fontSfig : fontSpr;

        const fontRezNum = $('.neon-sidebox__btn--active[data-btn-type="font"]').data('font-reznum');
        const fontRezCost = $('.neon-sidebox__btn--active[data-btn-type="font"]').data('font-rezcost');

        const fontLinesCountRatio = $('.neon-sidebox__btn--active[data-btn-type="font"]').data('font-linescount-ratio');
        const linesCountRatioResult = Math.ceil(linesCount * fontLinesCountRatio);

        const fontHeight1cmRatio = $('.neon-sidebox__btn--active[data-btn-type="font"]').data('font-height-ratio');
        const fontHeightValue = $('.js-neon-numberbox-input').val();
        const fontHeightRatioPrice = fontHeight1cmRatio * fontHeightValue;
    
        const totalPrice = Math.ceil(Math.ceil(neonValue * fontRatio1) + Math.ceil(fontSprOrSfig * lenght * fontRatio2) + Math.ceil(fontRezNum * lenght) * fontRezCost + linesCountRatioResult + fontHeightRatioPrice);

        $('.js-neon-price').text(totalPrice);
    };


    const calculatePrice = (price) => {

        const currentPrice = $('.js-neon-price').text();
        const recalcPrice = Number(currentPrice) + Number(price);
        $('.js-neon-price').text(recalcPrice);

    };

 
    const splitStringByChunks = (str, letterHeight, letterRatio) => {
        let finalString = '';
        const maxWidthCm = 200;

        let stringLength = str.length;
        let letterWidth = Math.round(letterHeight * letterRatio);
        let chunk = Math.round(maxWidthCm / letterWidth);
        const countLoops = Math.ceil(stringLength / chunk);

        for (var i = 0; i < countLoops; i++) {
            let countStart = chunk * i;
            let countEnd = countStart + chunk;
            let substringData = str.substring(countStart, countEnd);

            substringData = substringData.replace(/\n/g, '<br>');
            if (substringData.length % chunk === 0) {
                substringData += '<br>';
            }
            finalString += substringData;
        }

        return {
            finalString,
            countLoops
        };
    };


    const nl2br = (str, is_xhtml) => {
        let breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    };

    const setBackboardColor = (backboardcolor) => {
        console.log(backboardcolor);
    };

    const setMountingType = (mountingtype) => {
        console.log(mountingtype);
    };

    const setConnectionType = (connectiontype) => {
        console.log(connectiontype);
    };

    const setDimmer = (img, price) => {
        
        calculatePrice(price);
        console.log(img);
    };
    

    const setFontSizeRatio = (type) => {
        const neonText = document.querySelector('.js-neon-text');
        const fontSizeRatio = 1.02;
        const currentFontSize = parseFloat(getComputedStyle(neonText).fontSize);
        const recalcFontSize = type === 'minus' ? (currentFontSize / fontSizeRatio) : (currentFontSize * fontSizeRatio);

        $('.js-neon-text').css({
            'fontSize': recalcFontSize
        });
    };


    // fileUpload

    const imgLoad = document.querySelector('.js-neon-bg');
    const fileInput = document.querySelector('.js-neon-input-attachment');
    
    fileInput.addEventListener('change', function() {

        if (this.files) {
            const MAX_FILE_SIZE = 15;
            const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png'];
            const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

            const file = fileInput.files[0];
            const fileName = file.name;
            const fileExtension = fileName.split('.').pop();
            const fileType = file.type;
            
            if (ALLOWED_EXTENSIONS.includes(fileExtension) && ALLOWED_TYPES.includes(fileType)) {
                if (!fileSizeValidation(file.size, MAX_FILE_SIZE)) {
                    console.log('File size must be lower than 15Mb');
                    return;
                }

                const createObjectImage = URL.createObjectURL(file);
                imgLoad.style.backgroundImage = `url(${createObjectImage})`;
                document.querySelectorAll('.neon-backgrounds__btn').forEach((bg) => {
                    bg.classList.remove('neon-backgrounds__btn--active');
                });

                return;
            }

            console.log(`file extension ${fileExtension} not alowed`);
            return;
        }

        return;

    });


    function fileSizeValidation(size, max_size) {
        return (size / 1024 / 1024) < max_size;
    }

    

    // INIT

    const initNeon = () => {
        setFont(defaultsNeon.fontFamily);
        setTextAlign(defaultsNeon.textAlign);
        setNeon(defaultsNeon.textShadow);
        setText($('.js-neon-textarea').val());
    };

    initNeon();


    $('[data-fancybox]').fancybox({
        trapFocus: true,
        autoFocus: false,
        touch: false,
    });


});