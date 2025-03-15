//
//  ContentView.swift
//  HellopWorld
//
//  Created by 後藤祐希 on 2023/10/08.
//

import SwiftUI
import RealmSwift

struct ContentView: View {
    var body: some View {
        NavigationView{
            VStack{
                Text("思い出データベース").font(.system(size:30)).padding(20)
                    .font(.system(size:100,design: .rounded))
                
                Image("5EC05F24-1D8F-4AE0-82DF-C7BCF9FCF625_4_5005_c")
                    .resizable(resizingMode: .stretch)
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 300.0)
                    .padding()
                NavigationLink("はじめる",destination: MenuView()).padding(5)
                
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider{
    static var previews: some View{
        ContentView()
    }
}
