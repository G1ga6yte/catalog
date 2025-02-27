import {RangersImages} from "./rangersImages/rangersImages";
import {Icons} from "../pages/productPage/icons/icons";
import {MasterImages} from "./masterImages/masterImages";

export const RangersProducts = [
    {
        active: true, // false - anjatac
        productCode: "03001",
        name: "RANGERS", // anun
        description: "2К Высокопрочное полиуретановое защитное покрытие со структурным эфектом 3 : 1.", // meknabanutyun
        price: "8500", // himnakan gin
        newPrice: "", // skidki depqum
        image: RangersImages.img1, // nkar
        new: false,// norutyun
        sellingPrice: "11000",
        info: [
            {
                color: "бесцветный ",
                article: "12196",
                volume: "1 кг (комплект)",
                peacesInBox: "4"
            },
            {
                color: "чёрный",
                article: "12167",
                volume: "1 кг (комплект)",
                peacesInBox: "4"
            }
        ],
        dsc: "Двухкомпонентное высокопрочное полиуретановое защитное покрытие со структурным эффектом."
    },
    {
        active: true, // false - anjatac
        productCode: "03002",
        name: "Matt 2:1", // anun
        description: "Акриловый лак\n.", // meknabanutyun
        price: "11000", // himnakan gin
        newPrice: "", // skidki depqum
        image: RangersImages.img2, // nkar
        new: false,// norutyun
        sellingPrice: "13000",
        info: [
            {
                article: "6301",
                volume: "1 л",
                peacesInBox: "6"
            }
        ],
        dsc: "Высококачественный двухкомпонентный акриловый матовый лак. Предназначен для специализированного ремонта элементов кузова, которые не требуют глянцевой поверхности. Использование матового лака позволяет приобрести равномерную матовую поверхность. Обеспечивает прочное и долговечное покрытие.\n" +
            "\n" +
            "Лак Matt 2:1 можно смешивать с лаками InterTroton Crystal, Zircon, а также Multi Füller MS 2:1.\n" +
            "В зависимости от пропорции смешивания получим различную степень матовости.",
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
                        "2 : 1 + 10%"
                },
                {
                    img: Icons.img3,
                    text: "рабочая вязкость\n" +
                        "16 ÷ 18 сек. / 20°C"
                },
                {
                    img: Icons.img4,
                    text: "жизнеспособность смеси\n" +
                        "~ 7 ч /20°C"
                },
                {
                    img: Icons.img5,
                    text: "2 слоя\n" +
                        "HVLP / RP\n" +
                        "ø 1,3 ÷ 1,4 мм"
                },
                {
                    img: Icons.img6,
                    text: "между слоями\n" +
                        "10 ÷ 15 мин."
                },
                {
                    img: Icons.img8,
                    text: "время отверждения\n" +
                        "24 ч / 20°C"
                },
                {
                    img: Icons.img18,
                    text: "Внимание: Хорошо перемешайте лак после открытия банки!"
                }
            ]
        }
    },
]