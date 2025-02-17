import {MasterImages} from "./masterImages/masterImages";
import {Icons} from "../pages/productPage/icons/icons";

export const MasterProducts = [
    {
        active: true, // false - anjatac
        productCode: "00001",
        name: "V2007 HS 4:1", // anun
        description: "Акриловый грунт-наполнитель.", // meknabanutyun
        price: "5200", // himnakan gin
        newPrice: "", // skidki depqum
        image: MasterImages.img1, // nkar
        new: false,// norutyun
        sellingPrice: "6000",
        colors: ["black", "#888888", "white"],
        info: [
            {
                color: "серый",
                article: "1242",
                volume: "0,8 л + 0,2 л",
                peacesInBox: "6"
            },
            {
                color: "чёрный",
                article: "9061",
                volume: "0,8 л + 0,2 л",
                peacesInBox: "6"
            },
            {
                color: "белый",
                article: "12923",
                volume: "0,8 л + 0,2 л",
                peacesInBox: "6"
            },
            {
                color: "серый быстрый",
                article: "14829",
                volume: "0,8 л + 0,2 л",
                peacesInBox: "6"
            },
            {
                color: "чёрный быстрый",
                article: "14830",
                volume: "0,8 л + 0,2 л",
                peacesInBox: "6"
            },
            {
                color: "белый быстрый",
                article: "14831",
                volume: "0,8 л + 0,2 л",
                peacesInBox: "6"
            }
        ],
        dsc: "Высококачественный акриловый грунт-наполнитель премиум класса с высоким содержанием смол. Продукт класса HS.",
        use: {
            header: "Важные информации относительно применения продукта",
            types: [
                {
                    img: Icons.img1,
                    text: "обезжирить"
                },
                {
                    img: Icons.img2,
                    text: "пропорции смешивания\n" +
                        "4 : 1 + 5÷10%"
                },
                {
                    img: Icons.img3,
                    text: "рабочая вязкость\n" +
                        "30 ÷ 50 сек. / 20°C\n" +
                        "\n"
                },
                {
                    img: Icons.img4,
                    text: "жизнеспособность смеси\n" +
                        "40 мин. / 20°C"
                },
                {
                    img: Icons.img5,
                    text: "2 ÷ 3 слоя\n" +
                        "HVLP / RP\n" +
                        "ø 1,5 ÷ 2,0 мм"
                },
                {
                    img: Icons.img6,
                    text: "между слоями\n" +
                        "5 ÷ 10 мин.\n" +
                        "\n"
                },
                {
                    img: Icons.img7,
                    text: "перед прогреванием\n" +
                        "ок. 10 мин.\n" +
                        "\n"
                },
                {
                    img: Icons.img8,
                    text: "время отверждения\n" +
                        "3 ч / 20°C\n" +
                        "30 мин. / 60°C"
                },
                {
                    img: Icons.img9,
                    text: "P360 ÷ P500\n" +
                        "P280 ÷ P320"
                },
                {
                    img: Icons.img10,
                    text: "P600 ÷ P1000\n" +
                        "P800 ÷ P1000\n" +
                        "\n"
                }
            ]
        }
    },
    {
        active: true, // false - anjatac
        productCode: "00002",
        name: "Epoxy Primer 4:1", // anun
        description: "Антикоррозионный эпоксидный грунт-наполнитель.", // meknabanutyun
        price: "6000", // himnakan gin
        newPrice: "", // skidki depqum
        image: MasterImages.img2, // nkar
        new: false,// norutyun
        sellingPrice: "8000",
        colors: ["black", "#888888", "white"],
        info: []
    }

]