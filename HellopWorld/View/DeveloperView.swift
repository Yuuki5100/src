//
//  DeveloperView.swift
//  HelloWorld
//
//  Created by 後藤祐希 on 2023/10/22.
//

import SwiftUI
import RealmSwift

struct DeveloperView: View {
    @StateObject var viewModel = MemoriesTableEntity.shared
    @State private var showingSheetFlg = false
    let imageUrl = URL(string: "")
    
    var body: some View {
        List{
            ForEach(viewModel.memories.indices, id:\.self) { index in
                NavigationLink(destination: MemorialDetailView(memory:self.viewModel.memories[index])){
                    AsyncImage(url: MemorialDetailView.getFileInDocumentsDirectory(
                        fileName: viewModel.memories[index].imageFile)){ image in
                        image.resizable()
                                .frame(width:60 , height:60)
                                .clipShape(Circle())
                                .overlay(Circle().stroke(Color.gray))
                    } placeholder: {
                        //
                    }
                    Text(viewModel.memories[index].place)
                    Spacer()
                }
            }
        }
    }
}

struct DeveloperView_Previews: PreviewProvider{
    static var previews: some View{
        DeveloperView()
    }
}
