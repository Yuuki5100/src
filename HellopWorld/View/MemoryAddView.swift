//
//  MemoryAddView.swift
//  HelloWorld
//
//  Created by 後藤祐希 on 2023/10/21.
//

import SwiftUI
import PhotosUI

struct MemoryAddView: View {
    @ObservedObject var viewModel = MemoriesTableEntity.shared
    //テーブルに挿入する要素パラメータの初期化
    @State var placeField: String = ""
    @State var purposeField: String = ""
    @State var dateField: Date = Date()
    //Date構造体の生成、初期値は現在日時
    @State var selectionDate = Date()
    @State var selectedImages: [PhotosPickerItem] = []
    @State var newlyPickedImage: [UIImage] = []
    @State var remarks: String = ""
    
    //ViewModel呼び出し後の追加成功可否
    @State var addFlg: Bool = false
    //初期画面表示判定
    @State var startFlg: Bool = true
    
    
    //Viewのレイアウト定義
    var body: some View {
        VStack{
            Text("思い出追加画面").font(.system(size:30)).padding(20)
            Text("追加する思い出の詳細を記載してネ！")
            
            HStack{
                Text("場所：")
                TextField(placeField, text: $placeField).frame(width:200.0)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
            }
            
            HStack{
                Text("名目：")
                TextField(purposeField, text: $purposeField).frame(width:200.0)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
            }
            
            HStack{
                Text("写真：")
                PhotosPicker("画像をアップロード",
                             selection: $selectedImages,
                             maxSelectionCount:1,
                             selectionBehavior: .ordered,
                             matching: .images)
                .onChange(of: selectedImages) {
                        Task{
                            newlyPickedImage = []
                            
                            for item in selectedImages{
                                guard let data = try await item.loadTransferable(type: Data.self) else { continue }
                                guard let uiImage = UIImage(data: data) else { continue }
                                newlyPickedImage.append(uiImage)
                            }
                        }
                    }
            }
            
            HStack{
                DatePicker("日付：", selection: $selectionDate).frame(width:270)
//                TextField(dateField, text: $dateField).frame(width:200.0)
//                    .textFieldStyle(RoundedBorderTextFieldStyle())
            }
            
            HStack{
                Text("備考：")
                TextField(remarks, text: $remarks).frame(width:200.0)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
            }
            
            Button("追加") {
                //D層にアクセスしデータベースに「思い出」を追加する
                addFlg = viewModel.insert(
                    place:placeField,
                    purpose:purposeField,
//                    imageFile:newlyPickedImage,
                    imageFile:newlyPickedImage,
                    date:dateField,
                    remarks:remarks)
            }
            
            if addFlg == false && startFlg == true{
                Text("")
            } else if addFlg == true{
                Text("思い出の追加ができました！")
            } else if addFlg == false{
                Text("思い出の追加に失敗しました。")
            }                                    
        }
    }
}

struct MemoryAddView_Previews: PreviewProvider{
    static var previews: some View{
        MemoryAddView()
    }
}
