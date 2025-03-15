//
//  MenuView.swift
//  HelloWorld
//
//  Created by 後藤祐希 on 2023/10/21.
//

import SwiftUI

struct MenuView: View {
    @StateObject var viewModel = MemoriesTableEntity.shared
    
    var body: some View {
        VStack{
            Text("思い出選択画面").font(.system(size:30)).padding(20)
            Text("行う操作を選択してネ！").padding(10)
            NavigationLink("思い出を追加",destination: MemoryAddView()).padding(10)
            NavigationLink("思い出を検索",destination: MemorySearchView()).padding(10)
            NavigationLink("DB確認(開発者向け)",destination: DeveloperView()).padding(10)
                .onAppear(){
                    viewModel.select()
                }
        }
    }
}

struct MenuView_Previews: PreviewProvider{
    static var previews: some View{
        MenuView()
    }
}
