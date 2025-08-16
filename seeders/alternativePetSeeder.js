const faker = require("@faker-js/faker").fakerES;
const { Pet, ShelterUser } = require("../models");

module.exports = async () => {
    const dataPets = [
        {
            name: "Luna",
            description: `Luna fue encontrada abandonada en un descampado, con mucho frío y hambre.
            Fue llevada al refugio donde recibió atención veterinaria completa, vacunas, desparasitación y mucho cariño para recuperar su confianza.
            Hoy Luna es una perrita alegre, juguetona y cariñosa. Necesita un hogar con paciencia y amor, preferentemente con jardín donde pueda correr y explorarlo.`,
            sex: "female",
            size: "medium",
            categoryId: 1,
            age: 8,
            images: ["https://new-s3.shelterluv.com/profile-pictures/e7d8efb0c9e0f18960cc6f8831ec58de/0f46708e05a6be097125e54a947a71a5.jpeg"]
        },
        {
            name: "Simba",
            description: `Simba apareció perdido en la calle, asustado y desorientado.
            Tras ser rescatado, recibió tratamiento para una leve infección ocular y se le brindó alimentación nutritiva para recuperar su peso ideal.
            Ahora Simba es un perro sociable, curioso y muy cariñoso. Busca un hogar tranquilo donde pueda dormir en ventanas soleadas y recibir mucho afecto.`,
            sex: "male",
            size: "small",
            categoryId: 1,
            age: 12,
            images: ["https://www.dogstrust.org.uk/images/800x600/dogs/3591275/068Sh00000OBBWzIAP.jpg.webp"]
        },
        {
            name: "Magnus",
            description: `Magnus fue rescatado de un abandono en un terreno baldío, con heridas leves en sus patas.
            Recibió curaciones, vacunas y una dieta especial para fortalecer su sistema inmunológico.
            Hoy es un perro enérgico, juguetón y muy leal. Necesita un hogar activo que le brinde espacio para jugar y salir a paseos diarios.`,
            sex: "male",
            size: "large",
            categoryId: 1,
            age: 36,
            images: ["https://www.dogstrust.org.uk/images/800x600/dogs/3456729/068Sh00000EtttWIAR.jpg.webp"]
        },
        {
            name: "Nala",
            description: `Nala fue encontrada escondida bajo un auto en un barrio muy transitado, con miedo a las personas.
            Tras recibir cuidados y mucha socialización en el refugio, se volvió una gata confiada y dulce.
            Nala busca un hogar tranquilo, sin niños pequeños, donde pueda recibir cariño a su ritmo y disfrutar de la compañía de personas pacientes.`,
            sex: "female",
            size: "small",
            categoryId: 2,
            age: 18,
            images: ["https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/77368097/1/?bust=1754912328&width=1080"]
        },
        {
            name: "Garfield",
            description: `Garfield fue rescatado de una situación de maltrato, con desnutrición y miedo a los humanos.
            Recibió atención veterinaria completa, sesiones de socialización y un programa de nutrición para recuperar su fuerza.
            Hoy es un perro protector, muy cariñoso y obediente. Necesita un hogar responsable con experiencia, donde pueda sentirse seguro y amado.`,
            sex: "male",
            size: "large",
            categoryId: 2,
            age: 48,
            images: ["https://dbw3zep4prcju.cloudfront.net/animal/6a302552-6961-49a7-90db-156e231b1661/image/eb1ef7e2-ac02-4d03-9dd0-bc82dba634d4.jpg"]
        },
        {
            name: "Mimi",
            description: `Mimi fue encontrada en un parque, sola y deshidratada.
            En el refugio recibió atención veterinaria, vitaminas y mucho amor para superar su miedo.
            Ahora es una gata cariñosa y tranquila, que busca un hogar con calma y ventanas soleadas donde pueda relajarse.`,
            sex: "female",
            size: "medium",
            categoryId: 2,
            age: 8,
            images: ["https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/77321934/1/?bust=1754821494&width=1080"]
        },
        {
            name: "Firulais",
            description: `Firulais fue hallado en un basural, con una pata lastimada.
            Recibió tratamiento médico, cirugía menor y cuidados especiales hasta recuperarse.
            Hoy es un perro valiente y juguetón, ideal para una familia activa que disfrute de paseos largos y aventuras al aire libre.`,
            sex: "male",
            size: "medium",
            categoryId: 1,
            age: 30,
            images: ["https://www.dogstrust.org.uk/images/800x600/dogs/1249338/068Sh00000ITBqXIAX.jpg.webp"]
        },
        {
            name: "Mishi",
            description: `Mishi fue rescatada de la calle después de ser atropellada.
            Tras cirugía y rehabilitación, ahora está completamente recuperada.
            Es una gata dulce y tranquila, perfecta para un hogar donde le den mucho cariño y un lugar seguro para dormir.`,
            sex: "female",
            size: "large",
            categoryId: 2,
            age: 20,
            images: ["https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/76606557/1/?bust=1754912328&width=1080"]
        },
        {
            name: "Preguntale",
            description: `Preguntale fue encontrado vagando solo, muy flaco y asustado.
            Recibió atención veterinaria, comida nutritiva y mucho amor para recuperar su confianza.
            Hoy es un perro amigable, juguetón y leal, que necesita un hogar donde lo incluyan en la vida familiar y lo dejen correr y jugar.`,
            sex: "male",
            size: "large",
            categoryId: 1,
            age: 40,
            images: ["https://www.dogstrust.org.uk/images/1440x1080/dogs/3591441/068Sh00000OW1hYIAT.jpg.webp"]
        },
        {
            name: "Sr. Gato",
            description: `Sr. Gato fue encontrada abandonada en un barrio residencial, escondida entre arbustos.
            Fue atendida por veterinarios y comenzó un proceso de socialización.
            Ahora es una gata dulce y curiosa, que busca un hogar donde pueda explorar y recibir cariño sin presiones.`,
            sex: "female",
            size: "large",
            categoryId: 2,
            age: 15,
            images: ["https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/76412048/1/?bust=1754912304&width=1080"]
        },
        {
            name: "Pepe",
            description: `Pepe fue rescatado de un terreno baldío, con heridas por pelea con otros perros.
            Fue tratado y recibió vacunas y cuidados especiales.
            Es un perro fuerte, protector y cariñoso con las personas, ideal para un hogar activo que pueda brindarle espacio y cariño constante.`,
            sex: "male",
            size: "large",
            categoryId: 1,
            age: 2,
            images: ["https://www.dogstrust.org.uk/images/1440x1080/dogs/3591155/068Sh00000Ngf4jIAB.jpg.webp"]
        },
        {
            name: "Fatiga",
            description: `Fatiga fue encontrada en un estacionamiento, muy delgada y asustada.
            Recibió atención médica y mucho cariño en el refugio.
            Hoy es una gata sociable y tranquila, que busca un hogar seguro donde pueda recibir amor y disfrutar de siestas largas.`,
            sex: "female",
            size: "medium",
            categoryId: 2,
            age: 22,
            images: ["https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/77368098/1/?bust=1754912313&width=1080"]
        },
        {
            name: "Panchito",
            description: `Panchito apareció en la calle, cojeando y con signos de desnutrición.
            Fue atendido por veterinarios y recibió terapia física para su pata.
            Ahora es un perro activo, cariñoso y le encanta jugar, perfecto para una familia que disfrute de paseos diarios y actividades al aire libre.`,
            sex: "male",
            size: "medium",
            categoryId: 1,
            age: 28,
            images: ["https://www.dogstrust.org.uk/images/1440x1080/dogs/3593824/068Sh00000OeaQNIAZ.jpeg.webp"]
        },
        {
            name: "Cereza",
            description: `Cereza fue encontrada atrapada en un garaje abandonado.
            Recibió cuidados veterinarios, vacunas y mucho amor para superar su miedo.
            Ahora es una gata amigable y curiosa, que busca un hogar tranquilo donde pueda jugar y descansar a su ritmo.`,
            sex: "female",
            size: "large",
            categoryId: 2,
            age: 14,
            images: ["https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/77207704/1/?bust=1754912309&width=1080"]
        },
        {
            name: "Dante",
            description: `Dante fue rescatado de un terreno industrial, con heridas leves y hambre.
            Fue atendido y recibió tratamiento médico y alimentación especial.
            Hoy es un perro valiente y juguetón, ideal para un hogar activo con espacio para correr y jugar.`,
            sex: "male",
            size: "large",
            categoryId: 1,
            age: 35,
            images: ["https://www.dogstrust.org.uk/images/1440x1080/dogs/1258927/068Sh00000HsXhyIAF.jpeg.webp"]
        },
        {
            name: "Hermione",
            description: `Hermione fue encontrada escondida bajo un auto durante una tormenta.
            Fue atendida y socializada para recuperar la confianza en las personas.
            Ahora es una gata dulce y tranquila, perfecta para un hogar calmado y amoroso.`,
            sex: "female",
            size: "medium",
            categoryId: 2,
            age: 10,
            images: ["https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/76569337/2/?bust=1755336315&width=1080"]
        },
        {
            name: "Zeus",
            description: `Zeus apareció en la calle con signos de desnutrición y miedo a los humanos.
            Fue tratado y alimentado hasta recuperar fuerza y confianza.
            Hoy es un perro protector y leal, que necesita un hogar con paciencia y mucho cariño.`,
            sex: "male",
            size: "large",
            categoryId: 1,
            age: 3,
            images: ["https://www.dogstrust.org.uk/images/1440x1080/dogs/3592878/068Sh00000Np0LhIAJ.jpg.webp"]
        },
        {
            name: "Payaso",
            description: `Payaso fue encontrada sola en un parque, asustada y hambrienta.
            Recibió vacunas, desparasitación y cariño constante.
            Ahora es una gata cariñosa y curiosa, que busca un hogar donde pueda sentirse segura y amada.`,
            sex: "female",
            size: "medium",
            categoryId: 2,
            age: 12,
            images: ["https://i.pinimg.com/564x/88/6b/9c/886b9cbfce93737f9c026779fca496c9.jpg"]
        },
        {
            name: "Toby",
            description: `Toby fue rescatado de un terreno baldío con heridas leves.
            Fue atendido por veterinarios y recibió alimentación especial.
            Hoy es un perro enérgico y juguetón, perfecto para un hogar con jardín y actividad diaria.`,
            sex: "male",
            size: "medium",
            categoryId: 1,
            age: 26,
            images: ["https://www.dogstrust.org.uk/images/1440x1080/dogs/1260626/068Sh00000JVxP5IAL.jpg.webp"]
        },
        {
            name: "Manya",
            description: `Manya fue encontrada abandonada en la calle con signos de deshidratación.
            Fue atendida por veterinarios y socializada para recuperar confianza.
            Ahora es una gata dulce y tranquila, ideal para un hogar calmado y amoroso.`,
            sex: "female",
            size: "small",
            categoryId: 2,
            age: 9,
            images: ["https://media.4-paws.org/d/2/5/f/d25ff020556e4b5eae747c55576f3b50886c0b90/cut%20cat%20serhio%2002-1813x1811-720x719.jpg"]
        },
        {
            name: "Jefe",
            description: `Jefe fue rescatado de un terreno industrial con signos de maltrato.
            Recibió tratamiento veterinario y socialización intensiva.
            Hoy es un perro cariñoso y protector, ideal para una familia que pueda darle espacio y amor.`,
            sex: "male",
            size: "large",
            categoryId: 1,
            age: 45,
            images: ["https://www.dogstrust.org.uk/images/1440x1080/dogs/1243804/068Sh00000KokKKIAZ.jpg.webp"]
        },
        {
            name: "Pulgas",
            description: `Pulgas apareció sola en un parque, con miedo a las personas.
            Recibió cuidados y socialización en el refugio.
            Ahora es una gata amigable y curiosa, que busca un hogar seguro donde recibir cariño y atención.`,
            sex: "female",
            size: "small",
            categoryId: 2,
            age: 11,
            images: ["https://www.catster.com/wp-content/uploads/2023/11/cat-8121892_1280.jpg"]
        },
        {
            name: "Chewbacca",
            description: `Chewbacca fue hallado en la calle, flaco y cansado.
            Fue atendido y recibió alimentación especial y cariño.
            Hoy es un perro juguetón y leal, perfecto para un hogar activo que disfrute de paseos y juegos diarios.`,
            sex: "male",
            size: "medium",
            categoryId: 1,
            age: 32,
            images: ["https://www.dogstrust.org.uk/images/1440x1080/dogs/3576256/068Sh00000K8KzBIAV.jpg.webp"]
        },
        {
            name: "Negrita",
            description: `Negrita fue encontrada escondida en un garaje, muy asustada.
            Fue socializada y recibió atención médica.
            Ahora es una gata dulce y curiosa, ideal para un hogar tranquilo y seguro.`,
            sex: "female",
            size: "small",
            categoryId: 2,
            age: 13,
            images: ["https://www.shutterstock.com/image-photo/female-adult-calico-cat-sits-600nw-2381801163.jpg"]
        },
        {
            name: "El flaco",
            description: `El flaco fue rescatado de un terreno abandonado, con signos de desnutrición.
            Recibió alimentación especial y cuidados veterinarios.
            Hoy es un perro fuerte, juguetón y cariñoso, que necesita un hogar activo y amoroso.`,
            sex: "male",
            size: "large",
            categoryId: 1,
            age: 48,
            images: ["https://www.dogstrust.org.uk/images/1440x1080/dogs/3570930/068Sh00000LqwK0IAJ.jpg.webp"]
        },
        {
            name: "Coco",
            description: `Coco apareció sola en un parque, con hambre y miedo.
            Fue atendida y socializada hasta recuperar confianza en los humanos.
            Ahora es una gata dulce y tranquila, ideal para un hogar que le brinde amor y seguridad.`,
            sex: "female",
            size: "small",
            categoryId: 2,
            age: 10,
            images: ["https://vetmarlborough.co.nz/wp-content/uploads/cat-facts.jpg"]
        },
        {
            name: "Amigo",
            description: `Amigo fue encontrado en un basural, flaco y asustado.
            Recibió cuidados veterinarios, alimentación y socialización.
            Hoy es un perro amigable y juguetón, perfecto para un hogar con jardín y actividad diaria.`,
            sex: "male",
            size: "medium",
            categoryId: 1,
            age: 28,
            images: ["https://www.dogstrust.org.uk/images/1440x1080/dogs/3579606/068Sh00000OVhHaIAL.jpg.webp"]
        },
        {
            name: "Blanquita",
            description: `Blanquita fue hallada en una calle muy transitada, con miedo y hambre.
            Recibió cuidados médicos, socialización y mucho cariño.
            Hoy es una gata curiosa y cariñosa, que busca un hogar seguro y amoroso.`,
            sex: "female",
            size: "small",
            categoryId: 2,
            age: 14,
            images: ["https://chipigatofeliz.es/wp-content/uploads/2021/01/Blanquita-13.jpg"]
        }, {
            name: "Copito",
            description: `Copito nació en un hogar donde ya no podían cuidarlo y llegó al refugio siendo un conejo muy sociable. 
            Está sano, vacunado y acostumbrado al contacto humano. 
            Es un conejo juguetón y curioso, ideal para un hogar que le brinde un espacio seguro donde saltar y explorar`,
            sex: "female",
            size: "small",
            categoryId: 3,
            age: 10,
            images: ["https://available-animals.bestfriends.org/Animals/59957656_0.jpeg"]
        }





    ];


    const shelters = await ShelterUser.findAll();
    const pets = []
    for (let i = 0; i < dataPets.length; i++) {
        pets.push({
            ...dataPets[i],
            shelterUserId: faker.helpers.arrayElement(shelters).id,
        });
    }

    await Pet.bulkCreate(pets);
    console.log("[Database] Se corrió el seeder de Pets.");
};
