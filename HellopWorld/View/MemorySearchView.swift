//
//  MemorySearch.swift
//  HellopWorld
//
//  Created by 後藤祐希 on 2023/10/21.
//

import SwiftUI

struct MemorySearchView: View {
    @ObservedObject var viewModel = MemoriesTableEntity.shared

    var body: some View {
        VStack{
            Text("思い出検索画面").font(.system(size:30))
            
            Image("ACE7DF23-A224-4FEC-92B2-1A9605A7C5D5_4_5005_c")
                .resizable(resizingMode: .stretch)
                .aspectRatio(contentMode: .fit)
                .frame(width: 300.0)
                .padding()
            
            HStack{
                Text("場所：")
                TextField("placeField", text: /*@START_MENU_TOKEN@*//*@PLACEHOLDER=Value@*/.constant("")/*@END_MENU_TOKEN@*/).frame(width:200.0)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
            }
            
            HStack{
                Text("名目：")
                TextField("purposeField", text: /*@START_MENU_TOKEN@*//*@PLACEHOLDER=Value@*/.constant("")/*@END_MENU_TOKEN@*/).frame(width:200.0)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
            }
            
            HStack{
                Text("日付：")
                TextField("dateField", text: /*@START_MENU_TOKEN@*//*@PLACEHOLDER=Value@*/.constant("")/*@END_MENU_TOKEN@*/).frame(width:200.0)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
            }
            
            Text("※日付は「YYYYMMDD」で入力").font(.system(size:10))
            
            NavigationLink("検索", destination:
                    MemorySearchView()).padding(15)
        }
    }
}

struct MemorySearchView_Previews: PreviewProvider{
    static var previews: some View{
        MemorySearchView()
    }
}
