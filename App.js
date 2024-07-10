import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {colors,CLEAR,ENTER} from "./src/constants"
import Keyboard from "./src/components/Keyboard";
import{useEffect, useState} from 'react';
import { Alert } from 'react-native';


//safearewview helps with notches

const tries_count = 6;//here
const arraydup = (arr) => { // a way to update the array since use state directly
  return[...arr.map((therows)=>[...therows])];
}
///determine word, decide to to this inste of API
const determineDayofTheYear =() =>{
  const today = new Date();
  const begin = new Date(today.getFullYear(), 0,0); //begin of year
  const thedifference = today - begin;
  const aday = 1000 *60 *60 *24;
  const dayy = Math.floor(thedifference /aday); //number of day by seconds
  return dayy;
};

const onthisday =  determineDayofTheYear();
const bankofkeywords =["eaten", "lemon", "mango", "night", "ocean", "piano",
  "aback", "abate", "abbey", "abbot", "abhor", "abide", "abled", "abode", "abort", "about", 
    "above", "abuse", "abyss", "acorn", "acrid", "actor", "acute", "adage", "adapt", "adept", 
    "admin", "admit", "adobe", "adopt", "adore", "adorn", "adult", "affix", "afire", "afoot", 
    "after", "again", "agape", "agate", "agent", "agile", "aging", "aglow", "agony", "agree", 
    "ahead", "aider", "aisle", "alarm", "album", "alert", "algae", "alibi", "alien", "align", 
    "alike", "alive", "alley", "allow", "alloy", "aloft", "alone", "along", "aloof", "aloud", 
    "alpha", "altar", "alter", "amass", "amaze", "amber", "amble", "amend", "amiss", "amity", 
    "among", "ample", "amply", "amuse", "angel", "anger", "angle", "angry", "angst", "anime", 
    "ankle", "annex", "annoy", "annul", "anode", "antic", "anvil", "aorta", "apace", "apart", 
    "apple", "apply", "apron", "aptly", "argue", "arise", "armor", "aroma", "arose", "array", 
    "arrow", "arson", "artsy", "ascot", "ashen", "aside", "askew", "assay", "asset", "atoll", 
    "atone", "attic", "audio", "audit", "augur", "aunty", "avail", "avert", "avian", "avoid", 
    "await", "awake", "award", "aware", "awash", "awful", "awoke", "axial", "axiom", "azure", 
    "bacon", "badge", "badly", "bagel", "baggy", "baker", "baler", "balmy", "banal", "banjo", 
    "barge", "baron", "basic", "basil", "basin", "basis", "batch", "bathe", "baton", "batty", 
    "beach", "beady", "beard", "beast", "began", "begat", "beget", "begin", "begun", "being", 
    "belch", "belie",]

export default function App() {
  const keyword = bankofkeywords[onthisday % bankofkeywords.length] || "";
  const keywordarray = keyword.split(""); //number of cells
  const[therows, SetRows] = useState(new Array(tries_count).fill(new Array(keywordarray.length).fill("")));
  const[currentRow, setcurrentRow] = useState(0);
  const[currentcollum, setcurrentcollum] = useState(0);
  const[gameState, setGameState] = useState('playing'); //ke

  const keypressed1 = (key)=> { // help put each letter in a specfic collums
    if (gameState != "playing"){
      return;
    }
   const newArray = arraydup(therows)


  //CLEAR logic
  if(key == CLEAR){
     const collumprevious = currentcollum - 1;
     if (collumprevious >= 0) {
      newArray[currentRow][collumprevious] = "";
      SetRows(newArray);
      setcurrentcollum(collumprevious);
    }
    return;
  }
  //ENTER logic
  if(key == ENTER){
    if(currentcollum == therows[0].length){
    setcurrentRow(currentRow + 1);
    setcurrentcollum(0);
    }
    return
  }
  if (currentcollum < therows[0].length){
   newArray[currentRow][currentcollum] = key;
   SetRows(newArray);
   setcurrentcollum(currentcollum + 1);
  }
  };
  //to allow user to see which cell they are on
  const isActive  = (row, col)=> {
    return row === currentRow &&  col === currentcollum 
  }

  //to collor in the key board
  const findCellColor =(row, col)  =>{
     const cell = therows[row][col];
    if (row >= currentRow){
      return colors.black; //help user not cheat
    }
    if(cell == keywordarray[col]){//if user guessed the letter right in the right postions
      return colors.primary;
     }
  if(keywordarray.includes(cell)){ // if user guess right letter wrong postion
    return colors.secondary;
  }
  return colors.darkgrey // if user guess wrong letter and postion. fix later
  };

  const matchcolorwithletter =(color) =>{
    return therows.flatMap((row,A) => 
      row.filter((cell, Z ) => findCellColor(A,Z)=== color)
     );
  }
   const correctgreen =  matchcolorwithletter(colors.primary);
   const positionpurple =  matchcolorwithletter(colors.secondary);
   const allwrong =  matchcolorwithletter(colors.darkgrey);
  
//detemining if user won/lost
useEffect(() => {
  if (currentRow > 0){
       GameState();
       }
},[currentRow])

/// determinin when to stop
const GameState = () =>{
  if(win() && gameState !='won~W'){
    Alert.alert("Puzzle solved~╚(″⚈ᴗ⚈)╗.");
    setGameState('Won~W');
  }else if(lost() && gameState !='lost'){
    Alert.alert("Try again tomorrow (╯︿╰)")
    setGameState('lost');
  }
};
const win = () =>{
  const row = therows[currentRow - 1];
  return row.every((cell, A) => cell === keywordarray[A])
};
const lost =() =>{
  return !win() && currentRow == therows.length;
};////



  return (
    <SafeAreaView style={styles.container}> 
      <StatusBar style="light" />
      <Text style={styles.title}>ITS WORDLE</Text>

        <View style={styles.map}>
          {therows.map((row,A) =>(
          <View key ={`row-${A}`} style={styles.row}>
            {row.map((cell, Z)=> (
            <View
                key={`cell-${A}-${Z}`}
               style={[
                styles.cell,
                {borderColor: isActive(A, Z) 
                ? colors.lightgrey 
                :colors.darkgrey,
                backgroundColor: findCellColor( A, Z),
                },
                ]}>
              
              <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
            </View>
            ))}
        </View>
        ))}
        </View>
    <Keyboard onKeyPressed={keypressed1}
      greenCaps ={correctgreen}
      yellowCaps= {positionpurple}
      greyCaps ={allwrong}
    
    /> 
   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent : 'center',//
    
   
    },
  title: {
  color: colors.lightgrey, //mychoice
  fontSize:32,
  fontWeight:"bold",//fx later
  letterSpacing: 7, //spaces the title
  paddingTop: 25,
  },
  map:{
  alignSelf:"stretch",
   marginVertical: 20,
   maxWidth : 400,
   width: '100%',
  },
  row:{
    alignSelf:"stretch",
    flexDirection: 'row',
    justifyContent:'center',
  },
  cell:{
    borderWidth: 3,
    borderColor:colors.grey,
    flex: 1, //helps cells devide better
    aspectRatio: 1,
    maxWidth:70,
    margin:3,
    justifyContent:"center",
    alignItems:"center",

  },
  cellText:{
    color :colors.lightgrey,
    fontSize: 24,
    fontStyle:"normal",
  }
});
