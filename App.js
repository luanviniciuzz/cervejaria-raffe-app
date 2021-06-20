import React, { useState, useRef } from "react";
import {  StyleSheet, Dimensions, ImageBackground, Text, View, TouchableOpacity, StatusBar, Image, Animated, Linking, Platform, PermissionsAndroid} from "react-native";
import { Button, Icon,Fab, Container, ListItem, Body, Right,List, Left, Thumbnail } from 'native-base';
import Carousel from "react-native-snap-carousel";
import Geolocation from '@react-native-community/geolocation';




const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

console.disableYellowBox = true;
export default function App() {
  const [lista, setLista] = useState([
    {
      title: "084 IPA",
      text:
        "Uma American IPA para o dia todo. Cerveja âmbar, leve, com amargor médio e aroma cítrico",
      preco:
          "R$ 16,00",
      ibu:"49",
      teor:"5.9%",    
      img:
        "https://cdn-sites-images.46graus.com/files/photos/42ec5c75/d3021c2d-6cd0-43f7-9dd2-eee1b6222ee6/dsc_0195-2560x2493.jpg",
    },
    {
      title: "Galega do Alecrim Cream Ale",
      text:
        "Uma Cream Ale para aplacar a sede e o calor. Cerveja leve e clara, com um perfil neutro e refrescante ",
      preco:
        "R$ 11,00",
      ibu:"15",
      teor: "4.3%",    
      img:
        "https://cdn-sites-images.46graus.com/files/photos/42ec5c75/857212b5-0a19-42a7-a2d8-76bd7a0e5330/dsc_0098-2560x2522.jpg",
    },
    {
      title: "Mars Rover Amber Ale",
      text:
        "Uma Amber Ale para encher a boca. Cerveja acobreada, com bom equilíbrio entre o caráter maltado.",
      preco:
        "R$ 14,00",
      ibu:"29",
      teor:"5.3%",
      img:
        "https://cdn-sites-images.46graus.com/files/photos/42ec5c75/e1ba9e2a-a120-4ab8-a0a0-42d30975e313/dsc_0154-2560x2560.jpg",
    },
    {
      title: "Ponta Negra",
      text:
        "Uma Irish Stout com torrefação e cremosidade em evidência. Cerveja escura, com corpo médio, alto caráter de maltes torrados.",
      preco:
        "R$ 15,00",
      ibu:"45",
      teor:"5.8%",    
      img:
        "https://cdn-sites-images.46graus.com/files/photos/42ec5c75/d67bec10-797b-4974-abb8-1da9b15083c5/dsc_0228-2560x2519.jpg",
    },
    {
      title: "Nísia Witbier",
      text:
        "Uma witbier no melhor estilo belga. Cerveja de trigo clara, leve e refrescante, com notas cítricas.",
      preco:
        "R$ 12,00",
      ibu:"18",
      teor:"4.6%",      
      img:
        "https://cdn-sites-images.46graus.com/files/photos/42ec5c75/c0e75dce-f7fd-4b8e-a583-6a47fc883e0b/dsc_0135-2560x2560.jpg",
    },
    {
      title: "Fuderosa",
      text:
        "Uma Vienna Lager lançada em parceria com a Sem Etiqueta, bem leve e refrescante, daquelas que matam a sede e aliviam o calor.",
      preco:
        "R$ 13,00",
      ibu:"22",
      teor:"5.2%",       
      img:
        "https://cdn-sites-images.46graus.com/files/photos/42ec5c75/81555a06-6c5c-4d4a-850e-33e4e90b2e78/dsc_0115-2560x2497.jpg",
    },
  ]);

  const carouselRef = useRef(null);
  const [background, setBackground] = useState(lista[0].img);
  const [activeIndex, setActiveIndex] = useState(0);

  const [alturaAnimated, setalturaAnimated] = useState(new Animated.Value(0));
  const [detalhesOpen, setDetalhesOpen] = useState(false);
  const [fab, setFab] = useState(false)


  function trocou(index) {
    Animated.timing(alturaAnimated, {
      toValue: 150,
      duration: 550,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(alturaAnimated, {
        toValue: 0,
        duration: 550,
        useNativeDriver: false,
      }).start();
      setActiveIndex(index);
    });
  }

   

  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity style={styles.carousel}>
          <Image source={{ uri: item.img }} style={styles.carouselImg} />

          <Text style={styles.carouselText}>{item.title}</Text>
          
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <StatusBar backgroundColor="black" />
      <Container style={styles.container}>
        <View style={{ flex: 1, height: screenHeight }}>
          <View style={{ ...StyleSheet.absoluteFill, backgroundColor: "#000" }}>
            <ImageBackground
              source={{ uri: background }}
              style={styles.imgBg}
              blurRadius={3}
            >
              

              <Text style={styles.textAnuncio}>Catálogo</Text>

              <View style={styles.slideView}>
                <Carousel
                  style={styles.container}
                  ref={carouselRef}
                  data={lista}
                  renderItem={_renderItem}
                  sliderWidth={screenWidth}
                  itemWidth={200}
                  inactiveSlideOpacity={0.5}
                  onSnapToItem={(index) => {
                    setBackground(lista[index].img);

                    trocou(index);
                  }}
                />
              </View>

              <Animated.View
                style={{                  
                  marginTop: alturaAnimated,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  width: Dimensions.get('window').width,
                  height: 300,                  
                  flexDirection: "row",                  
                  //justifyContent: "center",
                  //paddingLeft: 10,
                  borderRadius: 15
                }}
              >


<List>
            <ListItem avatar style={{width:Dimensions.get('window').width*0.9}}>
              <Left>
                <Thumbnail source={{ uri: 'https://cdn-sites-images.46graus.com/files/photos/42ec5c75/ca441339-5592-4da8-8ae6-cc45a6ffa6d3/verde-200x200.png' }} />
              </Left>
              <Body>
                <Text style={styles.beerTitle}>
                    {lista[activeIndex].title}
                  </Text>
                  <Text style={styles.beerDescription}>
                    {lista[activeIndex].text}
                  </Text>
              </Body>             
              
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail style={{width:33, height:33}} source={ require('./src/image/lupulo.jpg') } />
              </Left>              
              <Body style={{flexDirection:'row', marginTop:'4%'}}>
                <Text style={styles.beerSubTitle}>IBU: </Text>
                <Text style={styles.beerDescription}>{lista[activeIndex].ibu}</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail style={{width:33, height:33}} source={ require('./src/image/malte.jpg') } />
              </Left>              
              <Body style={{flexDirection:'row', marginTop:'4%'}}>
                <Text style={styles.beerSubTitle}>Teor Alcóolico: </Text>
                <Text style={styles.beerDescription}>{lista[activeIndex].teor}</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail style={{width:33, height:33}} source={ require('./src/image/preco.jpg') } />
              </Left>              
              <Body style={{flexDirection:'row', marginTop:'4%'}}>
                <Text style={styles.beerSubTitle}>Preço: </Text>
                <Text style={styles.beerDescription}>{lista[activeIndex].preco}</Text>
              </Body>
            </ListItem>
          </List>
                {/* <View style={{ marginTop: 10 }}>
                
                  <Text style={styles.beerTitle}>
                    {lista[activeIndex].title}
                  </Text>
                  <Text style={styles.beerDescription}>
                    {lista[activeIndex].text}
                  </Text>
                  <Text style={styles.beerDescription}>
                    {lista[activeIndex].preco}
                  </Text>
                </View> */}
                
              </Animated.View>
            </ImageBackground>
          </View>
          <Fab
            active={fab}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#badc58' }}
            position="bottomRight"
            onPress={() => setFab(!fab)}>
            <Icon name="beer-outline" style={{color: 'black'}} />
            <Button style={{ backgroundColor: '#94b046' }} onPress={() => Linking.openURL('https://www.instagram.com/cervejariaraffe/')}>
              <Icon name="logo-instagram" />
            </Button>
            <Button style={{ backgroundColor: '#6f8434' }} onPress={() => Linking.openURL('http://api.whatsapp.com/send?phone=5584999871579')}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: '#4a5823' }}            
            onPress={() =>{ 
            if(Platform.OS === 'ios'){
              Linking.openURL('http://maps.apple.com/?ll=-5.8530095,-35.211476,19z')
            } 
            else{
              Linking.openURL('geo:-5.8528361,-35.2115082')              
            }
            }}
            >
              <Icon type="MaterialCommunityIcons" name="map-search-outline" style={{color:'white'}}/>
            </Button>
          </Fab>
        </View>
        
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBg: {
    flex: 1,
    width: null,
    height: null,
    opacity: 1,
    justifyContent: "flex-start",
    backgroundColor: "#000",
  }, 
  textAnuncio: {
    color: "#fff",
    fontSize: 25,
    lineHeight: 27,
    fontFamily:'Poppins-SemiBold',
    marginLeft: 10,
    marginVertical: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  slideView: {
    marginTop: 20,
    width: "100%",
    height: 330,
    justifyContent: "center",
    alignItems: "center",
  },
  carousel: {
    flex: 1,
    overflow: "visible",
  },
  carouselImg: {
    alignSelf: "center",
    width: 200,
    height: 300,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  carouselText: {
    padding: 15,
    color: "#fff",
    position: "absolute",
    left: 2,
    fontFamily:'Poppins-Regular'
  },
  carouselIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  moreInfo: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    width: 100,
    height: screenHeight,   
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 10,
  },
  beerTitle: {
    fontSize: 15,
    fontFamily:'Poppins-Bold',
    color: "#131313",
    marginBottom: 5,
  },
  beerDescription: {    
    color: "#131313",
    fontSize: 13,
    lineHeight: 15,
    fontFamily:'Poppins-Medium'    
  },
  beerSubTitle:{
    fontFamily:'Poppins-Bold',
    fontSize: 13,
    lineHeight: 15,
    color:'#131313'
  }
});
